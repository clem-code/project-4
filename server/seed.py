from app import app, db
from data.stock_data import list_stocks
from data.user_data import list_users
from data.trade_data import list_trades

with app.app_context():

    try:
        db.drop_all()

        db.create_all()

        db.session.add_all(list_users)
        db.session.commit()
        db.session.add_all(list_stocks)
        db.session.commit()
        db.session.add_all(list_trades)
        db.session.commit()

        print("🤖🤖 Everything committed 🤖🤖")
    except Exception as e:
        print("There was an error.")
        print(e)
