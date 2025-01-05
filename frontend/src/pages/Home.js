import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h2>Welcome to RAG Orchestrator</h2>
      <div className="home-buttons">
        <button onClick={() => navigate("/agents")}>Start Creating RAG Agents</button>
        <button onClick={() => navigate("/agent-list")}>RAG Agents List</button>
        <button onClick={() => navigate("/workflows")}>Build Workflow of RAG Agents</button>
      </div>
    </div>
  );
}

export default Home;
