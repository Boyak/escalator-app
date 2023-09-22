from flask import Flask, jsonify, request
import psycopg2
from templates_repo import TemplatesRepos
from flask_cors import CORS, cross_origin
from users import UsersRepos

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/users')
def get_users():
    user = UsersRepos()
    return user.get_users()

@app.route('/templates', methods=['GET'])
def get_templates():
    temp = TemplatesRepos()
    return temp.get_templates()

@app.route('/templates', methods=['POST'])
def add_user():
    try:
        # Get user data from the request
        data = request.json
        temp = TemplatesRepos()
        # Call the add_user method of the DatabaseHandler
        result = temp.add_template(data['name'], data['description'],data['content'],data['ownerid'])

        return result
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred."}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)