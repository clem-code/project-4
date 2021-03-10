from models.stock import Stock
from data.user_data import list_users

list_stocks = [
    Stock(name="apple", symbol="aapl", user=[list_users[0], list_users[1]]),
    Stock(name="google", symbol="goog", user=[list_users[0], list_users[2]]),
]
