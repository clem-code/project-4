from models.trade import Trade

list_trades = [
    Trade(
        name_of_asset="AAPL",
        asset_price=50,
        qty_purchased=1,
        total_trade_value=50,
        transaction_type="buy",
        stock_id=1,
        user_id=2,
        asset_type='stocks'
    ),
    Trade(
        name_of_asset="AAPL",
        asset_price=50,
        qty_purchased=3,
        total_trade_value=150,
        transaction_type="buy",
        stock_id=1,
        user_id=2,
        asset_type='stocks'
    ),
    Trade(
        name_of_asset="GOOG",
        asset_price=100,
        qty_purchased=1,
        total_trade_value=100,
        transaction_type="buy",
        stock_id=2,
        user_id=2,
        asset_type='stocks'
    ),
]
