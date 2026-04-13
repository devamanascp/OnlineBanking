from pydantic import BaseModel


class AccountResponse(BaseModel):
    id: int
    user_id: int
    balance: int

    class Config:
        from_attributes = True