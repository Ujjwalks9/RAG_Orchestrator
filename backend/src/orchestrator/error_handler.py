import time

class ErrorHandler:
    def retry_with_backoff(self, func, retries=3, backoff=2):
        for attempt in range(retries):
            try:
                print(f"Attempt {attempt + 1}: Retrying...")
                return func()
            except Exception as e:
                print(f"Attempt {attempt + 1} failed: {e}")
                if attempt < retries - 1:
                    time.sleep(backoff ** attempt)  # Exponential backoff
                else:
                    print("Max retries reached.")
                    raise Exception("Max Retries Reached!!")
