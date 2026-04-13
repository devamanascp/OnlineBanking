from sqlalchemy.orm import Session
from app.models.account import Account
from app.models.transaction import Transaction


def transfer_money(db: Session, from_account_id: int, to_account_id: int, amount: float):
    # 🔍 Get sender
    sender = db.query(Account).filter(Account.id == from_account_id).first()

    # 🔍 Get receiver
    receiver = db.query(Account).filter(Account.id == to_account_id).first()

    # ❌ Validation
    if not sender:
        return {"error": "Sender account not found"}

    if not receiver:
        return {"error": "Receiver account not found"}

    if sender.balance < amount:
        return {"error": "Insufficient balance"}

    # 💰 Deduct from sender
    sender.balance -= amount

    # 💰 Add to receiver
    receiver.balance += amount

    # 🧾 Record transaction
    txn = Transaction(
        from_account=from_account_id,
        to_account=to_account_id,
        amount=amount
    )

    db.add(txn)

    # 🔥 VERY IMPORTANT
    db.commit()

    # refresh updated values
    db.refresh(sender)
    db.refresh(receiver)

    return {
        "message": "Transfer successful",
        "from_balance": sender.balance,
        "to_balance": receiver.balance
    }