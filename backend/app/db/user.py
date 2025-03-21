from sqlalchemy.orm import Session
from app.models.user import DBUser
from app.schemas.user import UserCreate, UserUpdate
from app.exceptions.custom_exceptions import UserNotFoundError
 
def read_db_user(user_id: int, session: Session) -> DBUser:
    user_item = session.query(DBUser).filter(DBUser.id == user_id).first()
    
    if not user_item:
        raise UserNotFoundError(user_id)
    
    return user_item      

def read_all_db_users(session: Session) -> list[DBUser]:
    users_list = session.query(DBUser).all()
    
    return users_list

def create_db_user(user: UserCreate, session: Session) -> DBUser: 
    user_item = DBUser(**user.model_dump(exclude_none=True))
    session.add(user_item)
    session.commit()
    session.refresh(user_item)
    
    return user_item

def update_db_user(user_id: int, user: UserUpdate, session: Session) -> DBUser:
    user_item = read_db_user(user_id, session)
    
    for key, value in user.model_dump(exclude_none=True).items():
        setattr(user_item, key, value)
    
    session.commit()
    session.refresh(user_item)
    
    return user_item
    
def delete_db_user(item_id: int, session: Session) -> DBUser:
    user_item = read_db_user(item_id, session)
    session.delete(user_item)
    session.commit()
    return user_item