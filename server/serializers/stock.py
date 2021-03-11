from app import ma
from models.stock import Stock
from marshmallow import fields


class StockSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Stock
        load_instance = True

    user = fields.Nested("SimpleUserSchema")
    # comments = fields.Nested("CommentSchema", many=True)
    # ingredients = fields.Nested('IngredientSchema', many=True)


# # ! Add another cake schema that is not populated.
class SimpleStockSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Stock
        load_instance = True

    # user = fields.Nested("SimpleUserSchema")
