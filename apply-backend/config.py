"""Configuration loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings populated from environment variables or .env file."""

    GOOGLE_CREDENTIALS_JSON: str = ""
    GOOGLE_CREDENTIALS_B64: str = ""
    GOOGLE_SHEET_ID: str = ""
    GOOGLE_DRIVE_FOLDER_ID: str = ""
    RESEND_API_KEY: str = ""
    ADMIN_API_KEY: str = ""
    TURNSTILE_SECRET_KEY: str = ""
    EMAIL_FROM: str = "AI V&V Lab <ai-v-and-v-lab@kfupm.io>"
    CORS_ORIGINS: str = "https://mansurarief.github.io"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
