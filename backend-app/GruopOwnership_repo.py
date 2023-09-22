from  flask import jsonify

import psycopg2
class GroupsRepos:
    def __init__(self):
        self.db_params ={
            'dadatabase': "postgres",
            'user' : "vrs_FULL",
            'password' : "Alpha!23Alpha", 
            'host' : "pg-vrsengineers-escalator-hackathon-2023.postgres.database.azure.com",
            'port' : '5432'
        }
        self.conn = None
    def get_GroupOwnership(self):
        try: 
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()

            #SQL query
            query = "SELECT GroupOwenershipId, UserID, GroupID FROM GroupOwnership LIMIT 10"
            cursor.execute(query)
            GroupOwnership = cursor.fetchall()
            if GroupOwnership:
                GroupOwnerships_list = []
                for row in GroupOwnership:
                    group_dict = {
                        "Group": row[0],
                        "Name": row[1],
                        "Ownerid": row[2]
                    }
                    GroupOwnerships_list.append(group_dict)
                return jsonify(GroupOwnerships_list)
            cursor.close()
            self.conn.close()

            return jsonify(GroupOwnership)
        except Exception as e:
            print(f"Error: {e}")
            return "An error occurred."
    def add_GroupOwnerships(self, Name, Ownerid):
        try:
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()
            query = "INSERT INTO GroupOwnership (UserID, GroupID) VALUES (%i,%i) RETURNING GroupOwenershipId"
            cursor.execute(query, (Name, Ownerid))
            new_GroupOwenership_id = cursor.fetchone()[0]
            self.conn.commit()

            cursor. close()
            
            return jsonify({"messaga": "nGroupOwenership added succesfully", "GroupOwenershipId": new_GroupOwenership_id})
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": "An error occurred while adding the group"}), 500