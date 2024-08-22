#region IMPORTS
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
import services.user as user_service
#endregion

#region SET VARIABLES
app = Flask(__name__)
CORS(app)
#endregion

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
            return jsonify({"mensaje": "EXISTE"})
        else:
            return jsonify({"mensaje": "NO EXISTE"}), 400
    else:
        return jsonify({"error": "Faltan credenciales"}), 400

#endregion

# SERVER START URL => https://alviapi.ddns.net
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)