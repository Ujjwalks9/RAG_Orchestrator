


// import React, { useState, useEffect } from "react";
// import {
//   DndContext,
//   useSensor,
//   useSensors,
//   PointerSensor,
//   closestCenter,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   rectSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable";
// import Draggable from "./Draggable";
// import axios from "../api/apiClient";
// import "../styles/WorkFlowBuilder.css";

// function WorkflowBuilder() {
//   const [availableRAGs, setAvailableRAGs] = useState([]); // RAG agents fetched from backend
//   const [workflowSteps, setWorkflowSteps] = useState([]); // Steps in the workflow
//   const [error, setError] = useState(null); // Error handling
//   const [successMessage, setSuccessMessage] = useState(null); // Success message

//   const sensors = useSensors(useSensor(PointerSensor));

//   // Fetch RAG agents from backend
//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const response = await axios.get("/agents"); // Fetch agents from backend
//         const agents = response.data.flatMap((agent, index) => {
//           // Process all agents, even with invalid endpoints
//           if (!agent.endpoints || typeof agent.endpoints !== "object") {
//             console.warn(`Agent ${agent.name} has invalid or missing endpoints.`);
//             return [
//               {
//                 id: `${index}-invalid`,
//                 name: agent.name,
//                 action: "Invalid Endpoint",
//                 inputSchema: null,
//                 outputSchema: null,
//               },
//             ];
//           }

//           return Object.entries(agent.endpoints).map(([action, details]) => ({
//             id: `${index}-${action}`, // Unique ID for each action
//             name: agent.name,
//             action,
//             inputSchema: details.input_schema || null,
//             outputSchema: details.output_schema || null,
//           }));
//         });
//         setAvailableRAGs(agents);
//       } catch (err) {
//         console.error("Error fetching agents:", err);
//         setError("Failed to fetch RAG agents. Please try again.");
//       }
//     };

//     fetchAgents();
//   }, []);

//   // Handle drop logic
//   const handleDrop = (rag) => {
//     if (workflowSteps.length > 0) {
//       const lastAgent = workflowSteps[workflowSteps.length - 1];
//       if (
//         lastAgent.outputSchema &&
//         rag.inputSchema &&
//         JSON.stringify(lastAgent.outputSchema) !== JSON.stringify(rag.inputSchema)
//       ) {
//         setError(
//           `Input schema of "${rag.name}" does not match output schema of "${lastAgent.name}".`
//         );
//         return;
//       }
//     }
//     setError(null);
//     setWorkflowSteps([...workflowSteps, rag]);
//   };

//   // Handle drag end
//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (!over) return;

//     if (over.id === "workflow-area") {
//       // Dragging from toolbox to workflow area
//       const draggedRAG = availableRAGs.find((rag) => rag.id === active.id);
//       if (
//         draggedRAG &&
//         !workflowSteps.some((step) => step.id === draggedRAG.id)
//       ) {
//         handleDrop(draggedRAG);
//       }
//     } else {
//       // Reordering within the workflow area
//       const oldIndex = workflowSteps.findIndex((step) => step.id === active.id);
//       const newIndex = workflowSteps.findIndex((step) => step.id === over.id);
//       setWorkflowSteps((steps) => arrayMove(steps, oldIndex, newIndex));
//     }
//   };

//   // Submit the workflow to the backend
//   const handleSubmit = async () => {
//     if (workflowSteps.length === 0) {
//       setError("Please add at least one RAG agent to the workflow.");
//       return;
//     }

//     const workflow = {
//       steps: workflowSteps.map((step) => ({
//         agent: step.name,
//         action: step.action,
//         input: { input1: "test" }, // Example input; modify as needed
//       })),
//     };

//     try {
//       const response = await axios.post("/execute-workflow", workflow);
//       setSuccessMessage("Workflow submitted successfully!");
//       setError(null);
//       console.log("Workflow response:", response.data);
//       // Navigate to the homepage after successful submission
//       window.location.href = "/";
//     } catch (err) {
//       console.error("Error submitting workflow:", err);
//       setError(
//         "Workflow submitted with invalid endpoints. This is expected for a demo."
//       );
//       alert("Workflow submitted with invalid endpoints. This is expected for a demo.");
//       window.location.href = "/";
//     }
//   };

//   return (
//     <div className="workflow-builder">
//       {/* Toolbox */}
//       <div className="toolbox">
//         <h3>Available RAG Agents</h3>
//         {error && <div className="error-message">{error}</div>}
//         {availableRAGs.map((rag) => (
//           <div
//             key={rag.id}
//             className="toolbox-item"
//             draggable
//             onDragStart={(e) =>
//               e.dataTransfer.setData("rag", JSON.stringify(rag))
//             }
//           >
//             {rag.name} - {rag.action}
//           </div>
//         ))}
//       </div>

//       <div className="workflow-container">
//         {/* Workflow Area */}
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={workflowSteps.map((step) => step.id)}
//             strategy={rectSortingStrategy}
//           >
//             <div
//               id="workflow-area"
//               className="workflow-area"
//               onDrop={(e) => {
//                 const rag = JSON.parse(e.dataTransfer.getData("rag"));
//                 handleDrop(rag);
//               }}
//               onDragOver={(e) => e.preventDefault()}
//             >
//               <h3>Workflow Steps</h3>
//               {workflowSteps.map((step, index) => (
//                 <Draggable key={step.id} id={step.id}>
//                   <div className="workflow-step">
//                     <strong>{step.name}</strong> - {step.action}
//                     {index > 0 && <span>← Connected</span>}
//                   </div>
//                 </Draggable>
//               ))}
//             </div>
//           </SortableContext>
//         </DndContext>

//         {/* Submit Button */}
//         <button className="submit-button" onClick={handleSubmit}>
//           Submit Workflow
//         </button>
//       </div>

//       {/* Success Message */}
//       {successMessage && <div className="success-message">{successMessage}</div>}
//     </div>
//   );
// }

// export default WorkflowBuilder;


import React, { useState, useEffect } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Draggable from "./Draggable";
import axios from "../api/apiClient";
import "../styles/WorkFlowBuilder.css";

function WorkflowBuilder() {
  const [availableRAGs, setAvailableRAGs] = useState([]);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [workflowName, setWorkflowName] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("/agents");
        const agents = response.data.flatMap((agent, index) => {
          if (!agent.endpoints || typeof agent.endpoints !== "object") {
            console.warn(`Agent ${agent.name} has invalid or missing endpoints.`);
            return [
              {
                id: `${index}-invalid`,
                name: agent.name,
                action: "Invalid Endpoint",
                inputSchema: null,
                outputSchema: null,
              },
            ];
          }

          return Object.entries(agent.endpoints).map(([action, details]) => ({
            id: `${index}-${action}`,
            name: agent.name,
            action,
            inputSchema: details.input_schema || null,
            outputSchema: details.output_schema || null,
          }));
        });
        setAvailableRAGs(agents);
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError("Failed to fetch RAG agents. Please try again.");
      }
    };

    fetchAgents();
  }, []);

  const handleDrop = (rag) => {
    if (workflowSteps.length > 0) {
      const lastAgent = workflowSteps[workflowSteps.length - 1];
      if (
        lastAgent.outputSchema &&
        rag.inputSchema &&
        JSON.stringify(lastAgent.outputSchema) !== JSON.stringify(rag.inputSchema)
      ) {
        setError(
          `Input schema of "${rag.name}" does not match output schema of "${lastAgent.name}".`
        );
        return;
      }
    }
    setError(null);
    setWorkflowSteps([...workflowSteps, rag]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (over.id === "workflow-area") {
      const draggedRAG = availableRAGs.find((rag) => rag.id === active.id);
      if (
        draggedRAG &&
        !workflowSteps.some((step) => step.id === draggedRAG.id)
      ) {
        handleDrop(draggedRAG);
      }
    } else {
      const oldIndex = workflowSteps.findIndex((step) => step.id === active.id);
      const newIndex = workflowSteps.findIndex((step) => step.id === over.id);
      setWorkflowSteps((steps) => arrayMove(steps, oldIndex, newIndex));
    }
  };

  const handleSave = async () => {
    if (!workflowName.trim()) {
      setError("Please provide a name for the workflow.");
      return;
    }

    if (workflowSteps.length === 0) {
      setError("Please add at least one RAG agent to the workflow.");
      return;
    }

    const workflow = {
      name: workflowName.trim(),
      steps: workflowSteps.map((step) => ({
        agent: step.name,
        action: step.action,
        input: { input1: "test" },
      })),
    };

    try {
      const response = await axios.post("/save-workflow", workflow);
      setSuccessMessage(`Workflow "${workflowName}" saved successfully!`);
      setError(null);
      console.log("Workflow response:", response.data);
    } catch (err) {
      console.error("Error saving workflow:", err);
      setError("Failed to save the workflow. Please try again.");
    }
    window.location.href = "/";
  };

  const executeWorkflow = async () => {
    if (workflowSteps.length === 0) {
      setError("Please add at least one RAG agent to the workflow.");
      return;
    }

    const workflow = {
      steps: workflowSteps.map((step) => ({
        agent: step.name,
        action: step.action,
        input: { input1: "test" }, // Example input; modify as needed
      })),
    };

    try {
      const response = await axios.post("/execute-workflow", workflow);
      setSuccessMessage("Workflow submitted successfully!");
      setError(null);
      console.log("Workflow response:", response.data);
      // Navigate to the homepage after successful submission
      window.location.href = "/";
    } catch (err) {
      console.error("Error submitting workflow:", err);
      setError(
        "Workflow submitted with invalid endpoints. This is expected for a demo."
      );
      alert("Workflow submitted with invalid endpoints. This is expected for a demo.");
      // window.location.href = "/";
    }
  };

  return (
    <div className="workflow-builder">
      {/* Heading */}
      <h1 className="heading">Build Your Workflow</h1>

      {/* Workflow Name Input */}
      <div className="workflow-header">
        <input
          type="text"
          placeholder="Enter Workflow Name"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="workflow-name-input"
        />
        <button className="save-button" onClick={handleSave}>
          Save Workflow
        </button>
        <button className="save-button" onClick={executeWorkflow}>
          Execute and Check
        </button>
      </div>

      {/* Content Area */}
      <div className="content">
        {/* Toolbox */}
        <div className="toolbox">
          <h3>Available RAG Agents</h3>
          {error && <div className="error-message">{error}</div>}
          {availableRAGs.map((rag) => (
            <div
              key={rag.id}
              className="toolbox-item"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("rag", JSON.stringify(rag))
              }
            >
              {rag.name} - {rag.action}
            </div>
          ))}
        </div>

        {/* Workflow Area */}
        <div className="workflow-container">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={workflowSteps.map((step) => step.id)}
              strategy={rectSortingStrategy}
            >
              <div
                id="workflow-area"
                className="workflow-area"
                onDrop={(e) => {
                  const rag = JSON.parse(e.dataTransfer.getData("rag"));
                  handleDrop(rag);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <h3>Workflow Steps</h3>
                {workflowSteps.map((step, index) => (
                  <Draggable key={step.id} id={step.id}>
                    <div className="workflow-step">
                      <strong>{step.name}</strong> - {step.action}
                      {index > 0 && <span>← Connected</span>}
                    </div>
                  </Draggable>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default WorkflowBuilder;
