import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Agents from "./pages/Agents";
import AgentListPage from "./pages/AgentListPage";
import AgentDetails from "./pages/AgentDetails";
import Workflows from "./pages/Workflows";
import WorkflowsList from "./pages/WorkFlowList";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agent-list" element={<AgentListPage />} />
          <Route path="/agent-details/:id" element={<AgentDetails />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/workflows-list" element={<WorkflowsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
