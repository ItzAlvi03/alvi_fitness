#region IMPORTS
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
#endregion

#region SET VARIABLES
app = Flask(__name__)
CORS(app)
#endregion

#region API ENDPOINTS
@cross_origin
@app.route('/hello', methods=['GET'])
def hello():
    return "HELLO"
#endregion

# SERVER START URL => https://alviapi.ddns.net
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)