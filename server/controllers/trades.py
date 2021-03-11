from flask import Blueprint, request, g
from models.stock import Stock
from models.trade import Trade
from models.user import User
from serializers.trade import TradeSchema
# from decorators.secure_route import secure_route
# from serializers.stock import StockSchema

trade_schema = TradeSchema()
from marshmallow.exceptions import ValidationError

# stock_schema = StockSchema()

router = Blueprint(__name__, "trades")

# ! Comment out
@router.route("/alltrades", methods=["GET"])
def get_trades():
    trades = Trade.query.all()

    return trade_schema.jsonify(trades, many=True), 200

@router.route("/trades", methods=["GET"])
def get_my_trades():
    trades = Trade.query.all()

    my_trades = list(filter(lambda trade:trade.user == g.current_user, trades))

    return trade_schema.jsonify(my_trades, many=True), 200

@router.route("/trades/<int:trade_id>", methods=["GET"])
def get_single_trade(trade_id):
    trade = Trade.query.get(trade_id)

    if trade.user != g.current_user:
      return {'errors': 'This is not your trade!'}, 402

    if not trade:
        return {"message": "Trade not found"}, 404

    return trade_schema.jsonify(trade), 200


@router.route("/trades", methods=["POST"])
# @secure_route
def make_trade():
    trade_dictionary = request.json

    try:
        trade = trade_schema.load(trade_dictionary)
        trade.user = g.current_user

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    trade.save()

    return trade_schema.jsonify(trade), 200