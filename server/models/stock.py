from app import db
from models.base import BaseModel


class Stock(db.Model, BaseModel):

    __tablename__ = "stocks"

    name = db.Column(db.String(100), nullable=False)
    symbol = db.Column(db.String(100), nullable=True)
    type_of = db.Column(db.String(100), nullable=True)