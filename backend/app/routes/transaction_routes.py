from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.services.transaction_service import transfer_money
from app.dependencies.auth_dependency import get_current_user
from app.schemas.transaction_schema import TransferRequest

router = APIRouter(
    prefix="/transaction",
    tags=["Transaction"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/transfer")
def transfer(
    request: TransferRequest,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    return transfer_money(
        db,
        from_account_id=user_id,  # 🔥 important
        to_account_id=request.to_account_id,
        amount=request.amount
    )