
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/apiClient";
import "../styles/AgentDetails.css";

function AgentDetails() {
  const { id } = useParams(); // Get the filename from the URL
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await axios.get(`/agent/${id}`);
        setAgent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agent details:", error);
        setLoading(false);
      }
    };
    fetchAgentDetails();
  }, [id]);

  if (loading) {
    return <div className="agent-details">Loading...</div>;
  }

  if (!agent) {
    return <div className="agent-details">Agent not found!</div>;
  }

  // Extract endpoints and their details
  const endpoints = Object.entries(agent.paths || {});

  return (
    <div className="agent-details">
      <h2>{agent.info?.title || "Agent Details"}</h2>
      <h3>Endpoints:</h3>
      <ul>
        {endpoints.map(([path, details], index) => (
          <li key={index} className="endpoint-item">
            <p><strong>Path:</strong> {path}</p>
            <p><strong>Method:</strong> {details.method}</p>
            <p><strong>Input Schema:</strong></p>
            <pre>{JSON.stringify(details.input_schema, null, 2)}</pre>
            <p><strong>Output Schema:</strong></p>
            <pre>{JSON.stringify(details.output_schema, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentDetails;
