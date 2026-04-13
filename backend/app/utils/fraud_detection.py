def check_fraud(amount):
    # simple rule-based fraud detection
    if amount > 10000:
        return True
    return False