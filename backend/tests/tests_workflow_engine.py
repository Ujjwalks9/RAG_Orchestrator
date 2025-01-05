import unittest
from orchestrator.workflow_engine import Workflow_Engine

class TestWorkFlowEngine(unittest.TestCase):
    def test_execute_workflow(self):
        engine = WorkFlow_Engine()
        try:
            engine.execute_workflow("config/workflows/sample_workflow.json")
        except Exception as e:
            self.fail(f"WorkFlow execution Failed: {e}")