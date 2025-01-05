import json
from utils.openapi_parser import parse_openapi_spec
from orchestrator.logger import Logger

class AgentOnboarding:
    def __init__(self,registry_path="config/agents/"):
        self.registry_path = registry_path
    
    def register_agent(self,spec_path):
        try:
            with open(spec_path,'r') as file:
                spec = json.load(file)
            agent_metadata = parse_openapi_spec(spec)
            self.save_agent_metadata(agent_metadata)
            Logger.log(f"Agent registered: {agent_metadata['name']}")
        except Exception as e:
            Logger.log(f"Error in Registering Agent: {e}")

    def save_agent_metadata(self,metadata):
        agent_name = metadata['name']
        with open(f"{self.registry_path}{agent_name}.json", 'w') as file:
            json.dump(metadata,file)