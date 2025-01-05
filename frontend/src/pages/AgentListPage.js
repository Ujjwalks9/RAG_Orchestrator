import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/apiClient";
import "../styles/AgentList.css";

function AgentListPage() {
  const [agents, setAgents] = useState([]); // State to store agents
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("/agents"); // Fetch all agents
        setAgents(response.data); // Store agents in state
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError("Failed to fetch agents. Please try again later.");
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="agent-list">
      <h2>RAG Agents List</h2>

      {/* Display error message if fetching fails */}
      {error && <div className="error-message">{error}</div>}

      {/* Display agents if fetched successfully */}
      <ul>
        {agents.length > 0 ? (
          agents.map((agent, index) => (
            <li
              key={index}
              className="agent-item"
              onClick={() => navigate(`/agent-details/${agent.file}`)} // Navigate to details page
            >
              <strong>{agent.name}</strong>
            </li>
          ))
        ) : (
          <p>No agents found.</p> // Display message if no agents exist
        )}
      </ul>
    </div>
  );
}

export default AgentListPage;
