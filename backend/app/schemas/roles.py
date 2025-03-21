from pydantic import BaseModel

class Roles(BaseModel):
    id: int
    role: str
    