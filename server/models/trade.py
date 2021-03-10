from app import db
from models.base import BaseModel
from models.stock import Stock
from datetime import *


class Trade(db.Model, BaseModel):

    __tablename__ = "trades"

    name_of_asset = db.Column(db.String(100), nullable=False)
    asset_price = db.Column(db.Float, nullable=False)
    qty_purchased = db.Column(db.Float, nullable=False)
    total_trade_value = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))
    stock_id = db.Column(db.Integer, db.ForeignKey("stocks.id", ondelete="CASCADE"))
