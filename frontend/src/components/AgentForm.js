// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "../api/apiClient.js";
// // import "../styles/AgentForm.css";

// // function AgentForm() {
// //   const [agent, setAgent] = useState({ name: "", endpoint: "" });
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setAgent({ ...agent, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post("http://localhost:5000/api/register-agent", agent);
// //       alert("Agent registered successfully!");
// //       navigate("/");
// //     } catch (error) {
// //       alert("Error registering agent!");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="agent-form">
// //       <label>Agent Name:</label>
// //       <input
// //         type="text"
// //         name="name"
// //         value={agent.name}
// //         onChange={handleChange}
// //         required
// //       />
// //       <label>Agent Endpoint:</label>
// //       <input
// //         type="text"
// //         name="endpoint"
// //         value={agent.endpoint}
// //         onChange={handleChange}
// //         required
// //       />
// //       <button type="submit">Submit</button>
// //     </form>
// //   );
// // }

// // export default AgentForm;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/apiClient";
// import "../styles/AgentForm.css";

// function AgentForm() {
//   const [agent, setAgent] = useState({
//     title: "",
//     path: "",
//     method: "POST", // Default method
//     inputSchema: "",
//     outputSchema: "",
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAgent({ ...agent, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); 

//     // Build the final JSON structure
//     const agentData = {
//       "info": {
//         "title": "agent.title",
//       },
//       "paths": {
//         "[agent.path]": {
//           "method": "agent.method",
//           "input_schema": JSON.parse(agent.inputSchema),
//           "output_schema": JSON.parse(agent.outputSchema),
//         },
//       },
//     };

//     try {
//       await axios.post("http://localhost:5000/api/register-agent", agentData);
//       alert("Agent registered successfully!");
//       navigate("/");
//     } catch (error) {
//       alert("Error registering agent!");
//       console.error("Error Registering Agent:", error);
//       setError(error.response?.data?.error || "An unexpected error occurred.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="agent-form">
//       <label>Agent Title:</label>
//       <input
//         type="text"
//         name="title"
//         value={agent.title}
//         onChange={handleChange}
//         required
//       />

//       <label>API Path:</label>
//       <input
//         type="text"
//         name="path"
//         value={agent.path}
//         onChange={handleChange}
//         placeholder="e.g., http://localhost:3000/users"
//         required
//       />

//       <label>HTTP Method:</label>
//       <select name="method" value={agent.method} onChange={handleChange}>
//         <option value="POST">POST</option>
//         <option value="GET">GET</option>
//         <option value="PUT">PUT</option>
//         <option value="DELETE">DELETE</option>
//       </select>

//       <label>Input Schema (JSON):</label>
//       <textarea
//         name="inputSchema"
//         value={agent.inputSchema}
//         onChange={handleChange}
//         placeholder='e.g., {"type": "object", "properties": {"input1": {"type": "string"}}}'
//         required
//       ></textarea>

//       <label>Output Schema (JSON):</label>
//       <textarea
//         name="outputSchema"
//         value={agent.outputSchema}
//         onChange={handleChange}
//         placeholder='e.g., {"type": "object", "properties": {"output1": {"type": "string"}}}'
//         required
//       ></textarea>

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default AgentForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/apiClient";
import "../styles/AgentForm.css";

function AgentForm() {
  const [agent, setAgent] = useState({
    title: "",
    path: "",
    method: "POST", // Default method
    inputSchema: "",
    outputSchema: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent({ ...agent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Build the JSON structure
    const agentData = {
      info: {
        title: agent.title,
      },
      paths: {
        [agent.path]: {
          method: agent.method,
          input_schema: JSON.parse(agent.inputSchema),
          output_schema: JSON.parse(agent.outputSchema),
        },
      },
    };

    try {
      // Create a Blob object for the JSON data
      const jsonBlob = new Blob([JSON.stringify(agentData)], {
        type: "application/json",
      });

      // Create a FormData object
      const formData = new FormData();
      formData.append("spec", jsonBlob, "agent_spec.json");

      // Send the FormData to the backend
      const response = await axios.post("/register-agent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(response.data.message);
      alert("Agent registered successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error Registering Agent:", err);
      setError(err.response?.data?.error || "An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="agent-form">
      <label>Agent Title:</label>
      <input
        type="text"
        name="title"
        value={agent.title}
        onChange={handleChange}
        required
      />

      <label>API Path:</label>
      <input
        type="text"
        name="path"
        value={agent.path}
        onChange={handleChange}
        placeholder="e.g., http://localhost:3000/users"
        required
      />

      <label>HTTP Method:</label>
      <select name="method" value={agent.method} onChange={handleChange}>
        <option value="POST">POST</option>
        <option value="GET">GET</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>

      <label>Input Schema (JSON):</label>
      <textarea
        name="inputSchema"
        value={agent.inputSchema}
        onChange={handleChange}
        placeholder='e.g., {"type": "object", "properties": {"input1": {"type": "string"}}}'
        required
      ></textarea>

      <label>Output Schema (JSON):</label>
      <textarea
        name="outputSchema"
        value={agent.outputSchema}
        onChange={handleChange}
        placeholder='e.g., {"type": "object", "properties": {"output1": {"type": "string"}}}'
        required
      ></textarea>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default AgentForm;
