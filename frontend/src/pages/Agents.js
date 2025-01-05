import React from "react";
import AgentForm from "../components/AgentForm";
import "../styles/Agents.css"

function Agents() {
  return (
    <div className="agents-page">
      <h2>Create a New RAG Agent</h2>
      <AgentForm />
    </div>
  );
}

export default Agents;
