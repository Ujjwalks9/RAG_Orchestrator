
from flask import Flask, request, jsonify
from orchestrator.agent_onboarding import AgentOnboarding
from orchestrator.workflow_engine import WorkFlow_Engine
import os
import json

app = Flask(__name__)
app.config['JSONFIY_PRETTYPRINT_REGULAR'] = True

from flask_cors import CORS
CORS(app, resources={r"/*": {"origins": "*"}})

onboarding = AgentOnboarding()
workflow_engine = WorkFlow_Engine()

# Ensure the directory for agent files exists
AGENT_DIR = "config/agents"
os.makedirs(AGENT_DIR, exist_ok=True)

@app.route("/api/register-agent", methods=["POST"])
def register_agent():
    try:
        if "spec" not in request.files:
            return jsonify({"error": "No spec file provided"}), 400

        spec = request.files["spec"]
        spec_path = os.path.join(AGENT_DIR, "agent_spec.json")

        # Save the uploaded JSON file
        spec.save(spec_path)

        # Pass the file to the onboarding process
        onboarding.register_agent(spec_path)

        return jsonify({"message": "Agent Registered Successfully"}), 200
    except Exception as e:
        print(f"Error in /api/register-agent: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/agents", methods=["GET"])
def get_agents():
    try:
        agents = []
        for filename in os.listdir(AGENT_DIR):
            if filename.endswith(".json"):
                file_path = os.path.join(AGENT_DIR, filename)
                with open(file_path, "r") as file:
                    agent_data = json.load(file)
                    agents.append({
                        "name": agent_data.get("info", {}).get("title", filename),
                        "file": filename
                    })
        return jsonify(agents), 200
    except Exception as e:
        print(f"Error in /api/agents: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/agent/<filename>", methods=["GET"])
def get_agent_details(filename):
    try:
        file_path = os.path.join(AGENT_DIR, filename)
        if not os.path.exists(file_path):
            return jsonify({"error": "Agent not found"}), 404

        with open(file_path, "r") as file:
            agent_data = json.load(file)
        return jsonify(agent_data), 200
    except Exception as e:
        print(f"Error in /api/agent/<filename>: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/save-workflow", methods=["POST"])
def save_workflow():
    try:
        workflow = request.json
        workflow_name = workflow.get("name")
        if not workflow_name:
            return jsonify({"error": "Workflow name is required"}), 400

        workflow_path = os.path.join("config/workflows", f"{workflow_name}.json")
        os.makedirs(os.path.dirname(workflow_path), exist_ok=True)

        with open(workflow_path, "w") as file:
            json.dump(workflow, file, indent=4)

        return jsonify({"message": f"Workflow '{workflow_name}' saved successfully!"}), 200
    except Exception as e:
        print(f"Error saving workflow: {e}")
        return jsonify({"error": str(e)}), 500

        
# @app.route("/api/execute-workflow", methods=["POST"])
# def execute_workflow():
#     try:
#         workflow = request.json
#         workflow_path = "config/workflows/temp_workflow.json"
#         with open(workflow_path, "w") as file:
#             json.dump(workflow, file)
#         workflow_engine.execute_workflow(workflow_path)
#         return jsonify({"message": "Workflow executed Successfully!!"}), 200
#     except Exception as e:
#         print(f"Error in /api/execute-workflow: {e}")
#         return jsonify({"error": str(e)}), 500

@app.route("/api/workflows", methods=["GET"])
def get_workflows():
    try:
        workflows_dir = "config/workflows"
        workflows = []

        # Fetch all workflows from the workflows directory
        for filename in os.listdir(workflows_dir):
            if filename.endswith(".json"):
                file_path = os.path.join(workflows_dir, filename)
                with open(file_path, "r") as file:
                    workflow_data = json.load(file)
                    workflows.append(workflow_data)

        return jsonify(workflows), 200
    except Exception as e:
        print(f"Error in /api/workflows: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/execute-workflow", methods=["POST"])
def execute_workflow():
    try:
        workflow = request.json

        temp_path = "config/workflows/temp_workflow.json"
        with open(temp_path, "w") as temp_file:
            json.dump(workflow, temp_file)

        result = workflow_engine.execute_workflow(temp_path)

        response = {
            "workflowId": workflow.get("name"),
            "status": "success",
            "finalOutput": result.get("finalOutput"),
            "executionLogs": result.get("executionLogs"),
        }

        return jsonify(response), 200
    except Exception as e:
        print(f"Error executing workflow: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
