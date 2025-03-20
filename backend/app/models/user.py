from sqlalchemy.orm import Mapped, mapped_column
from app.db.database import Base

class DBUser(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    email: Mapped[str]