from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import User, UserCreate, UserUpdate, UserResponse 
from app.db.database import get_db
from app.db.user import (read_db_user, read_all_db_users, create_db_user, update_db_user, delete_db_user)

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)) -> User:
    
    return create_db_user(user=user, session=db)

@router.get("/", response_model=list[UserResponse])
def read_all_users(db: Session = Depends(get_db)) -> User:
    
    return read_all_db_users(db)

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)) -> User: 
    
    return update_db_user(user_id, user, db)

@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)) -> User:
    
    return read_db_user(user_id, db)

@router.delete("/{user_id}", response_model=UserResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)) -> User:

    return delete_db_user(user_id, db)
    