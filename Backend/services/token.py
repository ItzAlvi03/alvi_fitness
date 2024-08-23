import jwt
from datetime import datetime, timedelta

#   SUMMARY: Method that creates a new token with 8 hours of expiration
#   RETURN: token
#   VALUES: key(value to encrypt), username(user's name), result(contains all data of user)
def generate(key, username, id):
    expiration = datetime.utcnow() + timedelta(hours=8)
    payload = {
        'username': username,
        'id': id,
        'exp': expiration
    }
    token = jwt.encode(payload, key, algorithm='HS256')
    return token