# Logs API calls and responses.
import logging

logging.basicConfig(filename= 'logs/orchestrator.log', level = logging.INFO)

class Logger:
    @staticmethod
    def log(message):
        logging.info(message)