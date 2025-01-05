import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">RAG Orchestrator</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/agents">Agents</Link>
        <Link to="/agent-list">RAG Agents List</Link>
        <Link to="/workflows-list">Workflows</Link>
      </div>
    </nav>
  );
}

export default Navbar;
