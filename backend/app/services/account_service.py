accounts = []

def create_account(customer_id, balance):
    acc_id = len(accounts) + 1
    accounts.append({
        "account_id": acc_id,
        "customer_id": customer_id,
        "balance": balance
    })
    return {"message": "Account created", "account_id": acc_id}

def get_balance(account_id):
    for acc in accounts:
        if acc["account_id"] == account_id:
            return {"balance": acc["balance"]}
    return {"error": "Account not found"}