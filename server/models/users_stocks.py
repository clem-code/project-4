from app import db

# ! Here is our join table in FlaskSQLAlchemy!
# ? First arg to table is the tablename.
users_stocks_join = db.Table(
    "favourites",
    # ! We need a primary key. I'm going to use the unique pair for this key, (cake_id, ingredient_id)
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("stock_id", db.Integer, db.ForeignKey("stocks.id"), primary_key=True),
)