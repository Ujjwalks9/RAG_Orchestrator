import requests

class APIClient:
    def call_api(self,endpoint,data):
        try:
            if not isinstance(endpoint,str):
                raise ValueError(f"Invalid Endpoint: {endpoint}")
            print(f"Calling API at: {endpoint} with data: {data}")
            response = requests.post(endpoint, json=data)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"API call failed: {e}")
            raise Exception("API Call Failed {e}")