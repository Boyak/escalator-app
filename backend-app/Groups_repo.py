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
    def get_Groups(self):
        try: 
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()

            #SQL query
            query = "SELECT Groupid, Name, Ownerid FROM groups LIMIT 10"
            cursor.execute(query)
            groups = cursor.fetchall()
            if groups:
                groups_list = []
                for row in groups:
                    group_dict = {
                        "Group": row[0],
                        "Name": row[1],
                        "Ownerid": row[2]
                    }
                    groups_list.append(group_dict)
                return jsonify(groups_list)
            cursor.close()
            self.conn.close()

            return jsonify(groups)
        except Exception as e:
            print(f"Error: {e}")
            return "An error occurred."
    def add_Groups(self, Name, Ownerid):
        try:
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()
            query = "INSERT INTO Groups (Name, Ownerid) VALUES (%s,%i) RETURNING Groupid"
            cursor.execute(query, (Name, Ownerid))
            new_group_id = cursor.fetchone()[0]
            self.conn.commit()

            cursor. close()
            
            return jsonify({"messaga": "Group added succesfully", "Groupid": new_group_id})
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": "An error occurred while adding the group"}), 500