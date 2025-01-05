
# **RAG Orchestrator**

## **Overview**
The **RAG Orchestrator** is a robust framework designed to streamline workflows in **Retrieval-Augmented Generation (RAG)** systems. It enables seamless integration of multiple RAG agents, providing a user-friendly interface for managing, executing, and monitoring workflows. With features like agent onboarding, workflow validation, and execution, this tool is ideal for handling complex multi-agent workflows in real-world scenarios.

---
### **DEMO VIDEO**



https://github.com/user-attachments/assets/d8837b7c-95af-4eae-a2a5-cd1a6815e3e9



---

---

## **Technologies Used**

### **Frontend**
- **React**: For building a dynamic and interactive user interface.
- **Dnd-Kit**: For drag-and-drop functionality in the Workflow Builder.
- **Axios**: For making API requests to the backend.
- **CSS**: For styling and creating a responsive layout.

### **Backend**
- **Flask**: A lightweight WSGI web application framework for Python.
- **Python**: The core language used for backend development.
- **JSON**: For storing and exchanging agent and workflow configurations.

### **Database/Storage**
- **File System**: Agents and workflows are stored as JSON files in `config/agents` and `config/workflows`.

### **Other Tools**
- **Git**: For version control.
- **Postman**: For testing API endpoints.

---



## **Features**
- **Agent Onboarding**: 
  - Register RAG agents with their respective specifications.
  - Each agent is stored as a separate JSON file in the `config/agents` directory for easy access and management.

- **Workflow Builder**:
  - Drag-and-drop interface to create workflows using available RAG agents.
  - Real-time schema validation ensures compatibility between agents, providing error feedback for mismatched schemas.

- **Workflow Execution**:
  - Submit workflows for execution via the backend.
  - Save workflows with unique names in the `config/workflows` directory for future use.

- **Agent Management**:
  - View a list of registered agents and their details.
  - Inspect individual agents, including their endpoints, methods, input, and output schemas.

- **Extensibility**:
  - Designed to integrate with third-party APIs for enhanced functionality.
  - Modular structure makes it easy to add new features or extend existing ones.

---



---

## **Setup and Installation**

### **Prerequisites**
- **Backend**:
  - Python 3.8 or above
  - Flask and required Python libraries (see `requirements.txt`)

- **Frontend**:
  - Node.js 16.x or above
  - npm or yarn package manager

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/rag-orchestrator.git
   cd rag-orchestrator/backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```bash
   python main.py
   ```
   The backend server will be available at `http://localhost:5000`.

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd rag-orchestrator/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend server will be available at `http://localhost:3000`.

---

## **API Endpoints**

### **Agent Management**
1. **Register Agent**
   - **POST** `/api/register-agent`
   - Upload a JSON file containing agent details. Each agent is saved as a separate file in the `config/agents` directory.

2. **Get All Agents**
   - **GET** `/api/agents`
   - Returns a list of all registered agents with their names and file paths.

3. **Get Agent Details**
   - **GET** `/api/agent/<filename>`
   - Fetches details of a specific agent by filename.

### **Workflow Management**
1. **Save Workflow**
   - **POST** `/api/save-workflow`
   - Saves a workflow as a JSON file with a user-defined name in the `config/workflows` directory.

2. **Execute Workflow**
   - **POST** `/api/execute-workflow`
   - Executes a workflow using the defined steps and logs the results.

3. **Get All Workflows**
   - **GET** `/api/workflows`
   - Returns a list of all saved workflows.

---

## **How to Use**

### **1. Register a RAG Agent**
- Navigate to the agent registration page.
- Upload a JSON file with the agent's details, including `info`, `endpoints`, and schemas.
- Each agent is saved in `config/agents` with a unique file name.

### **2. Create a Workflow**
- Drag agents from the toolbox and drop them into the workflow area.
- Ensure schema compatibility between connected agents.
- Save the workflow by providing a name.

### **3. Execute a Workflow**
- Navigate to the saved workflows page.
- Select a workflow and click "Execute".
- View execution logs and results.

---

## **Example JSON Files**

### **Agent JSON**
```json
{
  "info": {
    "title": "Sample Agent"
  },
  "endpoints": {
    "http://localhost:3000/api/action": {
      "method": "POST",
      "input_schema": {
        "type": "object",
        "properties": {
          "input1": { "type": "string" }
        }
      },
      "output_schema": {
        "type": "object",
        "properties": {
          "output1": { "type": "string" }
        }
      }
    }
  }
}
```

### **Workflow JSON**
```json
{
  "name": "Sample Workflow",
  "steps": [
    {
      "agent": "Sample Agent",
      "action": "http://localhost:3000/api/action",
      "input": { "input1": "test data" }
    }
  ]
}
```

---

## **Key Advantages**
- **Modular Design**: Easily extendable to add more features or integrate new RAG agents.
- **Error Handling**: Provides detailed feedback for schema mismatches or invalid configurations.
- **Scalability**: Designed to handle multiple agents and complex workflows with minimal performance impact.

---

## **Future Enhancements**
- Real-time schema validation with visual feedback.
- Integration with third-party APIs for more dynamic agent management.
- Advanced monitoring dashboard for workflow execution.

---
---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---
## 📧 **Contact**
For queries or feedback, feel free to reach out at [ujjwalks2709@gmail.com
].

