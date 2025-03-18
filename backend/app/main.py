from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes
from app.db.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="User Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes.router)

@app.get("/")
def root():
    return {"message": "Welcome to the User Management API"}