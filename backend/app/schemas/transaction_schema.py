from pydantic import BaseModel


class TransferRequest(BaseModel):
    to_account_id: int
    amount: float


class TransactionResponse(BaseModel):
    message: str