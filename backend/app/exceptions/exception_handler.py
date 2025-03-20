from fastapi import Request
from fastapi.responses import JSONResponse
from app.exceptions.custom_exceptions import UserNotFoundError

async def user_not_found_handler(request: Request, exception: UserNotFoundError) -> JSONResponse:
    return JSONResponse(
        status_code=exception.status_code,
        content={"message": exception.detail}
    )