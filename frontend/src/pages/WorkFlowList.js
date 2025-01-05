// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/apiClient";
// import "../styles/WorkflowsList.css";

// function WorkflowsListPage() {
//   const [workflows, setWorkflows] = useState([]); // State to store workflows
//   const [error, setError] = useState(null); // State to handle errors
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchWorkflows = async () => {
//       try {
//         const response = await axios.get("/workflows");
//         setWorkflows(response.data); // Store workflows in state
//       } catch (err) {
//         console.error("Error fetching workflows:", err);
//         setError("Failed to fetch workflows. Please try again later.");
//       }
//     };

//     fetchWorkflows();
//   }, []);

//   const executeWorkflow = async (workflow) => {
//     try {
//       const response = await axios.post("/api/execute-workflow", workflow);
//       alert(`Workflow executed successfully!\n\nLogs:\n${JSON.stringify(response.data.executionLogs, null, 2)}`);
//     } catch (err) {
//       console.error("Error executing workflow:", err);
//       alert("Failed to execute workflow. Please try again.");
//     }
//   };

//   const handleuseWorkflow = async (workflow) => {
//     try {
//       const userInput = prompt("Enter dynamic input JSON:");
//       const parsedInput = JSON.parse(userInput);

//       const updatedWorkflow = { ...workflow, dynamicInput: parsedInput };
//       const response = await axios.post("/api/execute-workflow", updatedWorkflow);

//       alert(`Workflow executed successfully with dynamic input!\n\nFinal Output: ${response.data.finalOutput}`);
//     } catch (err) {
//       console.error("Error executing workflow dynamically:", err);
//       alert("Failed to execute workflow with dynamic input.");
//     }
//   };

//   return (
//     <div className="workflows-list">
//       <h2 className="heading">Workflows</h2>

//       {error && <div className="error-message">{error}</div>}

//       <div className="workflows-container">
//         {workflows.length > 0 ? (
//           workflows.map((workflow, index) => (
//             <div key={index} className="workflow-card">
//               <h3>{workflow.name}</h3>
//               <div className="actions">
//                 <button onClick={() => navigate(`/workflow-builder/${workflow.name}`)}>Edit</button>
//                 <button onClick={() => executeWorkflow(workflow)}>Execute</button>
//                 <button onClick={() => handleuseWorkflow(workflow)}>Use Now</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No workflows found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default WorkflowsListPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/apiClient";
import "../styles/WorkflowsList.css";

function WorkflowsListPage() {
  const [workflows, setWorkflows] = useState([]); // State to store workflows
  const [error, setError] = useState(null); // State to handle errors
  // const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  // Fetch workflows from backend
  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await axios.get("/workflows");
        setWorkflows(response.data); // Store workflows in state
      } catch (err) {
        console.error("Error fetching workflows:", err);
        setError("Failed to fetch workflows. Please try again later.");
      }
    };

    fetchWorkflows();
  }, []);

  // Execute workflow
  const executeWorkflow = async (workflow) => {
    // try {
    //   const response = await axios.post("/execute-workflow", workflow);
    //   alert(`Workflow executed successfully!\n\nLogs:\n${JSON.stringify(response.data.executionLogs, null, 2)}`);
    // } catch (err) {
    //   console.error("Error executing workflow:", err);
    //   alert("Failed to execute workflow. Please try again.");
    // }
    //  
   try {
      const response = await axios.post("/execute-workflow", workflow);
      // setSuccessMessage("Workflow submitted successfully!");
      setError(null);
      console.log("Workflow response:", response.data);
      
    } catch (err) {
      console.error("Error submitting workflow:", err);
      setError(
        "Workflow submitted with invalid endpoints. This is expected for a demo video. With valid endpoints it will show the success message here."
      );
      alert("Workflow submitted with invalid endpoints. This is expected for a demo. After Execution with valid endpoints a success message will appear here.");
      
    }
  };



  // Use workflow dynamically
  const handleuseWorkflow = async (workflow) => {
    try {
      const userInput = prompt("Enter dynamic input JSON:");
      const parsedInput = JSON.parse(userInput);

      const updatedWorkflow = { ...workflow, dynamicInput: parsedInput };
      const response = await axios.post("/execute-workflow", updatedWorkflow);

      alert(`Workflow executed successfully with dynamic input!\n\nFinal Output: ${response.data.finalOutput}`);
    } catch (err) {
      console.error("Error executing workflow dynamically:", err);
      alert("Failed to execute workflow with dynamic input.");
    }
  };

  return (
    <div className="workflows-list">
      <h2 className="heading">Workflows</h2>

      {/* Display error message if fetching fails */}
      {error && <div className="error-message">{error}</div>}

      {/* Display workflows if fetched successfully */}
      <div className="workflows-container">
        {workflows.length > 0 ? (
          workflows.map((workflow, index) => (
            <div key={index} className="workflow-item">
              <strong>{workflow.name}</strong>
              <div className="workflow-actions">
                {/* <button onClick={() => navigate(`/workflows/${workflow.name}`)}>Edit</button> */}
                <button onClick={() => navigate(`/workflows`)}>Edit</button>
                <button onClick={() => executeWorkflow(workflow)}>Execute</button>
                <button onClick={() => handleuseWorkflow(workflow)}>Use Now</button>
              </div>
            </div>
          ))
        ) : (
          <p>No workflows found.</p>
        )}
      </div>
    </div>
//       {/* Success Message */}
//       {successMessage && <div className="success-message">{successMessage}</div>}
  );
}

export default WorkflowsListPage;
