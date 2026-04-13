from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    from_account = Column(Integer, nullable=False)
    to_account = Column(Integer, nullable=False)
    amount = Column(Integer, nullable=False)
    status = Column(String, default="SUCCESS")
    fraud_flag = Column(String, default="LOW")
    timestamp = Column(DateTime, default=datetime.utcnow)