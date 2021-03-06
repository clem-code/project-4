from app import ma
from models.user import User
from marshmallow import fields


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ("password_hash",)
        load_only = ("email", "password")

    password = fields.String(required=True)

    trades = fields.Nested("SimpleTradeSchema", many=True)
    favourites = fields.Nested("SimpleStockSchema", many=True)

    class SimpleUserSchema(ma.SQLAlchemyAutoSchema):
        class Meta:
            model = User
            load_instance = True
