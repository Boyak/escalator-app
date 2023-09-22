from  flask import jsonify

import psycopg2
class UsersRepos:
    def __init__(self):
        self.db_params ={
            'dadatabase': "postgres",
            'user' : "vrs_FULL",
            'password' : "Alpha!23Alpha", 
            'host' : "pg-vrsengineers-escalator-hackathon-2023.postgres.database.azure.com",
            'port' : '5432'
        }
        self.conn = None
    def get_Users(self):
        try: 
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()

            #SQL query
            query = "SELECT Userid, Name, Position, Managerid FROM users LIMIT 10"
            cursor.execute(query)
            users = cursor.fetchall()
            if users:
                users_list = []
                for row in users:
                    user_dict = {
                        "UserID": row[0],
                        "Name": row[1],
                        "Position": row[2],
                        "Managerid": row[3]
                    }
                    users_list.append(user_dict)
                return jsonify(users_list)
            cursor.close()
            self.conn.close()

            return jsonify(users)
        except Exception as e:
            print(f"Error: {e}")
            return "An error occurred."
    def add_Users(self, Name, Position, Managerid):
        try:
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()
            query = "INSERT INTO Users (Name, Position, ManagerId) VALUES (%s,%s,%i) RETURNING Userid"
            cursor.execute(query, (Name, Position, Managerid))
            new_user_id = cursor.fetchone()[0]
            self.conn.commit()

            cursor. close()
            
            return jsonify({"messaga": "User added succesfully", "Userid": new_user_id})
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": "An error occurred while adding the user"}), 500