from models.stock import Stock
from data.user_data import list_users
import requests


list_stocks = [
    Stock(name="mango", symbol="mango", user=[list_users[0], list_users[1]]),
    Stock(name="floogle", symbol="floogle", user=[list_users[0], list_users[2]]),
]
r = requests.get(
    "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c13rrgf48v6r3f6kt4d0"
)
stocks = r.json()
for stock in stocks:
    example = Stock(
        name=f"{stock['description']}",
        symbol=f"{stock['displaySymbol']}",
        user=[list_users[0]],
    )
    list_stocks.append(example)
