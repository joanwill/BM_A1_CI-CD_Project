
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Tasks API"
    DATABASE_URL: str = "sqlite:///./tasks.db"
    CORS_ORIGINS: str = "*"

settings = Settings()
