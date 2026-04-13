🏦 Online Banking System

A full-stack online banking application built with **FastAPI** (Python) for the backend and **React.js** for the frontend. The system supports customer, admin, and support roles with secure JWT-based authentication, fund transfers, transaction history, fraud detection, and OTP simulation.

---
📁 Project Structure

```
banking-system/
│
├── backend/
│   └── app/
│       ├── main.py                  # FastAPI app entry point
│       ├── database.py              # DB connection & session management
│       ├── config.py                # Environment config loader
│       │
│       ├── models/                  # SQLAlchemy ORM models
│       │   ├── user.py
│       │   ├── account.py
│       │   └── transaction.py
│       │
│       ├── schemas/                 # Pydantic request/response schemas
│       │   ├── auth_schema.py
│       │   └── transaction_schema.py
│       │
│       ├── routes/                  # API route handlers
│       │   ├── auth_routes.py
│       │   ├── account_routes.py
│       │   ├── transaction_routes.py
│       │   └── admin_routes.py
│       │
│       ├── services/                # Business logic layer
│       │   ├── auth_service.py
│       │   ├── transaction_service.py
│       │   └── admin_service.py
│       │
│       ├── utils/                   # Utilities & helpers
│       │   ├── jwt_handler.py
│       │   ├── password.py
│       │   ├── otp.py
│       │   └── fraud_detection.py
│       │
│       ├── dependencies/            # FastAPI dependency injection
│       │   ├── auth_dependency.py
│       │   └── role_checker.py
│       │
│       ├── constants/               # App-wide constants
│       │   ├── roles.py
│       │   └── status.py
│       │
│       ├── requirements.txt
│       └── .env
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Transfer.jsx
│       │   ├── Transactions.jsx
│       │   └── AdminDashboard.jsx
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── Card.jsx
│       │
│       ├── services/
│       │   ├── api.js
│       │   ├── authService.js
│       │   ├── transactionService.js
│       │   └── adminService.js
│       │
│       ├── context/
│       │   └── AuthContext.js
│       │
│       ├── routes/
│       │   └── AppRoutes.jsx
│       │
│       ├── App.js
│       └── index.js
│
└── README.md
```

---

🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | FastAPI (Python) |
| **Frontend Framework** | React.js |
| **Database** | PostgreSQL / SQLite (via SQLAlchemy ORM) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Security** | bcrypt hashing |
| **API Communication** | REST APIs (JSON) |
| **State Management** | React Context API |
| **Routing (Frontend)** | React Router DOM |
| **HTTP Client** | Axios |
| **OTP** | Simulated OTP via utility module |
| **Fraud Detection** | Rule-based detection logic |

---

🗄️ Database Schema

### `users` Table
| Column | Type | Description |
|---|---|---|
| `id` | UUID / Integer (PK) | Unique user identifier |
| `full_name` | String | Full name of the user |
| `email` | String (Unique) | Login email |
| `hashed_password` | String | bcrypt hashed password |
| `role` | Enum | `customer`, `admin`, `support` |
| `is_active` | Boolean | Account active status |
| `created_at` | DateTime | Registration timestamp |

### `accounts` Table
| Column | Type | Description |
|---|---|---|
| `id` | UUID / Integer (PK) | Unique account identifier |
| `user_id` | FK → users.id | Account owner |
| `account_number` | String (Unique) | Generated account number |
| `balance` | Float | Current account balance |
| `account_type` | Enum | `savings`, `current` |
| `status` | Enum | `active`, `frozen`, `closed` |
| `created_at` | DateTime | Account creation timestamp |

### `transactions` Table
| Column | Type | Description |
|---|---|---|
| `id` | UUID / Integer (PK) | Unique transaction identifier |
| `sender_account_id` | FK → accounts.id | Sender's account |
| `receiver_account_id` | FK → accounts.id | Receiver's account |
| `amount` | Float | Transfer amount |
| `type` | Enum | `transfer`, `deposit`, `withdrawal` |
| `status` | Enum | `pending`, `completed`, `failed`, `flagged` |
| `description` | String | Optional transaction note |
| `timestamp` | DateTime | Transaction timestamp |
| `is_flagged` | Boolean | Fraud flag |

---

🔐 Authentication & Roles

### Roles (defined in `constants/roles.py`)
- **customer** — Can view their own account, transfer funds, and see transaction history.
- **admin** — Full access: manage users, freeze accounts, view all transactions, analytics.
- **support** — Read-only access to user accounts for assistance purposes.

### Auth Flow
1. User registers → password is hashed with bcrypt → stored in DB.
2. User logs in → credentials verified → JWT access token returned.
3. Token included in `Authorization: Bearer <token>` header for all protected routes.
4. `auth_dependency.py` extracts and validates the token on each request.
5. `role_checker.py` enforces role-based access control (RBAC).

### Environment Variables (`.env`)
```env
DATABASE_URL=postgresql://user:password@localhost/banking_db
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

 🌐 API Endpoints

### Auth Routes (`/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login and get JWT token | Public |
| GET | `/auth/me` | Get current logged-in user | Authenticated |

### Account Routes (`/accounts`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/accounts/my` | Get own account details | Customer |
| GET | `/accounts/{id}/balance` | Check account balance | Customer |

### Transaction Routes (`/transactions`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/transactions/transfer` | Transfer funds between accounts | Customer |
| GET | `/transactions/history` | View own transaction history | Customer |
| GET | `/transactions/{id}` | View a specific transaction | Customer |

### Admin Routes (`/admin`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/admin/users` | List all users | Admin |
| PATCH | `/admin/users/{id}/freeze` | Freeze a user account | Admin |
| GET | `/admin/transactions` | View all transactions | Admin |
| GET | `/admin/dashboard` | Analytics & summary | Admin |

---

⚙️ Core Business Logic

### Fund Transfer (`transaction_service.py`)
1. Validate sender and receiver accounts exist and are active.
2. Check sender's balance is sufficient.
3. Run fraud detection checks.
4. If flagged, mark transaction as `flagged` and halt/alert.
5. Debit sender's balance and credit receiver's balance atomically.
6. Record transaction with status `completed`.

### Fraud Detection (`utils/fraud_detection.py`)
Rule-based checks include:
- Transfer amount exceeds defined daily limit.
- Multiple rapid transfers in a short time window.
- Transfer to a previously unfamiliar account.
- Unusual hours activity detection.

### OTP Simulation (`utils/otp.py`)
- Generates a 6-digit OTP on transfer initiation.
- OTP is verified before the transaction is processed.
- Simulated (not SMS-based) for development purposes.

### Password Security (`utils/password.py`)
- Passwords hashed using `bcrypt` before storage.
- On login, plain password is verified against the stored hash.

---

 🖥️ Frontend Pages

| Page | Route | Description |
|---|---|---|
| Login | `/login` | User login form with JWT handling |
| Register | `/register` | New user registration |
| Dashboard | `/dashboard` | Account summary & balance overview |
| Transfer | `/transfer` | Fund transfer with OTP verification |
| Transactions | `/transactions` | Transaction history with filters |
| Admin Dashboard | `/admin` | Admin panel for user & transaction management |

---

🔄 Project Workflow

```
User opens app
      │
      ▼
Login / Register
      │
      ▼
JWT Token issued & stored in AuthContext
      │
      ├──► Customer flow
      │         ├── View Dashboard (balance, account info)
      │         ├── Initiate Transfer → OTP → Fraud Check → Execute
      │         └── View Transaction History
      │
      └──► Admin flow
                ├── View all users & accounts
                ├── Freeze / unfreeze accounts
                └── View analytics & flagged transactions
```

---

🚀 Sprint Breakdown

### Sprint 1 — System Design
- Architecture design, database schema, role definitions, API planning, UI screen planning.

### Sprint 2 — Backend Development
- Implement all APIs for customer, admin, and support roles.
- Database integration, JWT auth, fraud detection, OTP simulation.

### Sprint 3 — Frontend & Integration
- Build UI for Login, Dashboard, Transfer, Transactions, Admin Dashboard.
- Connect frontend to backend APIs via Axios services.

---

 ✅ Features

- [x] User registration and login with JWT authentication
- [x] Role-based access control (Customer, Admin, Support)
- [x] Account balance viewing
- [x] Secure fund transfers between accounts
- [x] Transaction history with status tracking
- [x] OTP simulation for transfer verification
- [x] Fraud detection and transaction flagging
- [x] Admin dashboard for user and transaction management
- [x] Account freeze / unfreeze by admin
- [ ] Scheduled transfers *(optional extension)*
- [ ] Transfer limit enforcement *(optional extension)*
- [ ] Transaction statement export *(optional extension)*
- [ ] Email/SMS fraud alerts *(optional extension)*

---

📦 Installation & Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
# Configure your .env file
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start

---

📊 Evaluation Criteria

- Business understanding of banking workflows
- Clean system design and architecture
- Working backend with functional APIs
- Functional and user-friendly UI
- Clarity in presentation and code organization

---

👥 Authors

Team Hack Force
Members:
Devamaanas CP
Parthiv P Pradeep
Shaik Roshan
Oleti Priyanka
