from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user_routers
from app.db.database import engine, Base
from app.exceptions.custom_exceptions import UserNotFoundError
from app.exceptions.exception_handler import user_not_found_handler

Base.metadata.create_all(bind=engine)

app = FastAPI(title="User Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routes
app.include_router(user_routers.router)


# Add the custom exceptions
app.add_exception_handler(UserNotFoundError, user_not_found_handler)

@app.get("/")
def root():
    return {"message": "Welcome to the User Management API"}