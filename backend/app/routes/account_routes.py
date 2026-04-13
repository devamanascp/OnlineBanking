from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.account import Account

router = APIRouter(
    prefix="/account",
    tags=["Account"]
)


# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ Create account
@router.post("/create")
def create_account(user_id: int, db: Session = Depends(get_db)):
    new_account = Account(
        user_id=user_id,
        balance=10000
    )

    db.add(new_account)
    db.commit()
    db.refresh(new_account)

    return {
        "message": "Account created successfully",
        "account_id": new_account.id
    }


# ✅ Get balance
@router.get("/balance/{account_id}")
def get_balance(account_id: int, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()

    if not account:
        return {"error": "Account not found"}

    return {
        "account_id": account.id,
        "balance": account.balance
    }


# ✅ 🔥 Get ALL accounts (for testing)
@router.get("/all")
def get_all_accounts(db: Session = Depends(get_db)):
    accounts = db.query(Account).all()

    return [
        {
            "account_id": acc.id,
            "user_id": acc.user_id,
            "balance": acc.balance
        }
        for acc in accounts
    ]