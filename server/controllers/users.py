from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError
# from decorators.secure_route import secure_route

user_schema = UserSchema()

router = Blueprint(__name__, "users")

@router.route("/signup", methods=["POST"])
def signup():

    try:
        user = user_schema.load(request.json)

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }

    user.save()

    return user_schema.jsonify(user)


@router.route('/login', methods=['POST'])
def login():
    user = User.query.filter_by(email=request.json['email']).first()

    if not user:
        return { 'message': 'No user found for this email' }
    
    if not user.validate_password(request.json['password']):
        return { 'message' : 'You are not authorized' }, 402

    token = user.generate_token()

    return { 'token': token, 'message': 'Welcome back!' }


@router.route('/profile', methods=['GET'])
# @secure_route
def get_user_profile():
    return user_schema.jsonify(g.current_user)


