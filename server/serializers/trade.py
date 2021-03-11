from app import ma
from models.trade import Trade
from marshmallow import fields


class TradeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Trade
        load_instance = True

    user = fields.Nested('UserSchema')
    # comments = fields.Nested("CommentSchema", many=True)
    # ingredients = fields.Nested('IngredientSchema', many=True)


# ! Add another cake schema that is not populated.
# class SimpleCakeSchema(ma.SQLAlchemyAutoSchema):
#    class Meta:
#        model = Cake
#        load_instance = True
