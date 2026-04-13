from sqlalchemy.orm import Session
from app.models.user import User
from app.models.account import Account
from app.schemas.auth_schema import RegisterRequest, LoginRequest
from app.utils.password import hash_password, verify_password
from app.utils.jwt_handler import create_access_token


def register_user(data: RegisterRequest, db: Session):
    # check existing user
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        return {"error": "User already exists"}

    # hash password
    hashed_password = hash_password(data.password)

    # create user
    new_user = User(
        name=data.name,
        email=data.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # create account
    new_account = Account(
        user_id=new_user.id,
        balance=10000
    )

    db.add(new_account)
    db.commit()

    return {"message": "User registered successfully"}


def login_user(data: LoginRequest, db: Session):
    # find user
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        return {"error": "User not found"}

    # verify password (IMPORTANT FIX)
    if not verify_password(data.password, user.password):
        return {"error": "Invalid credentials"}

    # create token
    token = create_access_token({"user_id": user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }