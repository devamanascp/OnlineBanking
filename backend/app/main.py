from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

# import models (important for table creation)
from app.models import user, account, transaction

# import routes
from app.routes import auth_routes
from app.routes import account_routes
from app.routes import transaction_routes
from app.routes import admin_routes

app = FastAPI(
    title="Online Banking API",
    version="1.0.0"
)

# ✅ CORS (required for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ create tables
Base.metadata.create_all(bind=engine)

# ✅ include routers
app.include_router(auth_routes.router)
app.include_router(account_routes.router)
app.include_router(transaction_routes.router)
app.include_router(admin_routes.router)


# ✅ SYSTEM / HEALTH CHECK (no more "default")
@app.get("/", tags=["System"])
def home():
    return {
        "message": "Online Banking API Running",
        "status": "OK"
    }