#region IMPORTS
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
import services.user as user_service
import jwt
import services.token as token_service
#endregion

#region SET VARIABLES
app = Flask(__name__)
app.config['SECRET_KEY'] = 'abe0ec61f6ca4091b1cee27ba20259eb'
CORS(app)
#endregion

#   SUMMARY: Method to check all the tokens
#   RETURN: response 200(with the token info) or response 400 (invalid token)
#   VALUES: func(all the data from the endpoint)
def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        data = request.json
        if not data or 'token' not in data:
            return jsonify({'error': 'Falta el token.'}), 400

        token = data['token']

        if not token:
            return jsonify({'error': 'Falta el token.'}), 400

        try:
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            return func(payload, *args, **kwargs)

        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'El token ha caducado.'}), 400
        except jwt.InvalidTokenError:
            return jsonify({'error': 'El token es inválido.'}), 400

    return decorated

#region API ENDPOINTS
@app.route('/hello', methods=['GET'])
def hello():
    return "HELLO"

@app.route('/user/login', methods=['POST'])
def user_login():
    data = request.json
    email = data.get('email', None)
    password = data.get('password', None)

    if email and password:
        result = user_service.exists(email, password)
        if result is not None:
            token = token_service.generate(app.config['SECRET_KEY'], result[0], result[1])
            return jsonify(token)
        else:
            return jsonify({"mensaje": "NO EXISTE"}), 400
    else:
        return jsonify({"error": "Faltan credenciales"}), 400

#endregion

# SERVER START URL => https://alviapi.ddns.net
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)