from flask import jsonify
import psycopg2

class TemplatesRepos:
    def __init__(self):
        # Database connection parameters
        self.db_params = {
            'database': 'postgres',
            'user': 'vrs_FULL',
            'password': 'Alpha!23Alpha',
            'host': 'pg-vrsengineers-escalator-hackathon-2023.postgres.database.azure.com',
            'port': '5432',  # Default PostgreSQL port
        }
        self.conn = None
    def get_templates(self):    
        try:
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()

            # Define your SQL SELECT query
            query = "SELECT templateid, name, description,content,ownerid FROM templates LIMIT 10"
            cursor.execute(query)
            templates = cursor.fetchall()
            if templates:
                # Create a list of dictionaries where each dictionary represents a user row
                users_list = []
                for row in templates:
                    items = get_ExcaltionStepsTemplates(row[0])
                    user_dict = {
                        "template_id": row[0],
                        "name": row[1],
                        "description": row[2],
                        "content": row[3],
                        "ownerid": row[4],
                        "items": items

                    }
                    users_list.append(user_dict)

                # Return the user data as a JSON response
                return jsonify(users_list)

            cursor.close()
            self.conn.close()

            return jsonify(templates)

        except Exception as e:
            print(f"Error: {e}")
            # Handle any exceptions here
            return "An error occurred."
        
    def add_template(self, name, description,content,ownerid):
        try:
            # Connect to the database
            self.conn = psycopg2.connect(**self.db_params)

            # Create a cursor object to interact with the database
            cursor = self.conn.cursor()

            # Define your SQL INSERT query
            query = "INSERT INTO templates (name, description,content,ownerid) VALUES (%s, %s,%s,%s) RETURNING templateid"

            # Execute the SQL query and get the new user's ID
            cursor.execute(query, (name, description,content,ownerid))
            new_template_id = cursor.fetchone()[0]

            # Commit the changes to the database
            self.conn.commit()

            # Close the cursor
            cursor.close()

            # Return the ID of the newly added user as JSON response
            return jsonify({"message": "User added successfully", "template_id": new_template_id})

        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": "An error occurred while adding the user"}), 500
