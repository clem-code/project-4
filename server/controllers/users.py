from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

user_schema = UserSchema()

router = Blueprint(__name__, "users")


@router.route("/signup", methods=["POST"])
def signup():

    try:
        user = user_schema.load(request.json)

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong."}

    user.save()

    return user_schema.jsonify(user)


@router.route("/login", methods=["POST"])
def login():
    user = User.query.filter_by(email=request.json["email"]).first()

    if not user:
        return {"message": "No user found for this email"}

    if not user.validate_password(request.json["password"]):
        return {"message": "You are not authorized"}, 402

    token = user.generate_token()

    return {"token": token, "message": "Welcome back!"}


@router.route("/profile", methods=["GET"])
@secure_route
def get_user_profile():
    return user_schema.jsonify(g.current_user)


@router.route("/user/<int:user_id>", methods=["DELETE"])
@secure_route
def delete_user_profile(user_id):
    user = User.query.get(user_id)
    if user != g.current_user:
        return {"errors": "Unauthorized"}, 402
    user.remove()
    return {"message": "User successfully deleted"}, 200


@router.route("/users", methods=["GET"])
@secure_route
def get_all_users():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200


@router.route("/<int:user_id>/wallet", methods=["PUT"])
@secure_route
def update_wallet(user_id):

    existing_user = User.query.get(user_id)
    qty_dictionary = request.json

    if not existing_user:
        return {"message": "No user found"}
    if existing_user != g.current_user:
        return {"errors": "Unauthorized"}, 401

    try:
        user = user_schema.load(
            qty_dictionary,
            instance=existing_user,
            partial=True,
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    user.save()

    return user_schema.jsonify(user), 201