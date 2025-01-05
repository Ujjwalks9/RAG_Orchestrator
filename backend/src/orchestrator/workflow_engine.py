import json
from utils.api_client import APIClient
from orchestrator.error_handler import ErrorHandler
from orchestrator.logger import Logger

class WorkFlow_Engine:
    def __init__(self,registry_path="config/agents/"):
        self.registry_path = registry_path
        self.api_client = APIClient()
        self.error_handler = ErrorHandler()

    def execute_workflow(self,workflow_data):
        try:
            print(f"Workflow Data Type: {type(workflow_data)}")
            if isinstance(workflow_data,str):
                print(f"Workflow Path: {workflow_data}")
                with open(workflow_data,'r') as file:
                    workflow = json.load(file)
            elif isinstance(workflow_data,dict):
                workflow = workflow_data
            else:
                raise ValueError("Invalid Workflow data. Must be a file path or dictionary.")

            for step in workflow['steps']:
                agent_name = step.get('agent')
                action = step.get('action')
                input_data = step.get('input')

                if not agent_name or not action or not input_data:
                    raise ValueError(f"Invalid Step Configuration: {step}")

                agent_metadata = self.load_agent_metadata(agent_name)
                if action not in agent_metadata['endpoints']:
                    raise KeyError(f"Action '{action}' not found in agent '{agent_name}' metadata")

                endpoint = agent_metadata['endpoints'][action]
                response = self.error_handler.retry_with_backoff(
                    lambda: self.api_client.call_api(endpoint, input_data)
                )
                Logger.log(f"Steps in the workflow executed:{step['action']}, Response:{response}")
            Logger.log("WorkFlow executed Successfully.")
        except Exception as e:
            Logger.log(f"Error executing Workflow {e}")
            raise e
    
    def load_agent_metadata(self,agent_name):
        try:
            with open(f"{self.registry_path}{agent_name}.json", 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            raise FileNotFoundError(f"Metadata for agent '{agent_name}' not found.")
