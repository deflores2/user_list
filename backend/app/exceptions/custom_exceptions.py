from fastapi import HTTPException

class UserNotFoundError(HTTPException):
    def __init__(self, user_id: int):
        self.detail = f"User with ID {user_id} not found."
        super().__init__(status_code=404, detail=self.detail)