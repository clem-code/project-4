from flask import Blueprint, request, g
from models.stock import Stock
from models.user import User
from serializers.stock import StockSchema
from decorators.secure_route import secure_route

stock_schema = StockSchema()
from marshmallow.exceptions import ValidationError

router = Blueprint(__name__, "stocks")


@router.route("/stocks", methods=["GET"])
def get_all_stocks():
    stocks = Stock.query.all()

    return stock_schema.jsonify(stocks, many=True), 200


@router.route("/stocks/<int:stock_id>", methods=["GET"])
def get_single_stock(stock_id):
    stock = Stock.query.get(stock_id)

    if not stock:
        return {"message": "Stock not found"}, 404

    return stock_schema.jsonify(stock), 200


@router.route("/<int:user_id>/favourites", methods=["GET"])
@secure_route
def get_user_favourites(user_id):
    user = User.query.get(user_id)
    # ! Get that ingredient
    stocks = Stock.query.all()
    print(stocks)
    favourites = list(filter(lambda stock: stock.id == g.current_user, stocks))

    return stock_schema.jsonify(favourites)


# ! POST A User Favourite TO A Stock
@router.route("/stocks/<int:stock_id>/favourites/<int:user_id>", methods=["POST"])
@secure_route
def add_favourite(stock_id, user_id):

    stock = Stock.query.get(stock_id)

    user = User.query.get(user_id)

    if user != g.current_user:
        return {"errors": "Unauthorized!"}, 401

    if not stock:
        return {"message": "Stock not found"}, 404

    stock.user.append(user)
    print(user)

    stock.save()

    return stock_schema.jsonify(stock), 200


@router.route("/stocks/<int:stock_id>/favourites/<int:user_id>", methods=["DELETE"])
@secure_route
def delete_favourite(stock_id, user_id):

    stock = Stock.query.get(stock_id)

    user = User.query.get(user_id)

    if user != g.current_user:
        return {"errors": "Unauthorized!"}, 401

    if not stock:
        return {"message": "Stock not found"}, 404

    stock.user.remove(user)

    stock.save()

    return stock_schema.jsonify(stock), 200