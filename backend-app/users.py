from flask import Flask
import psycopg2


class UsersRepos:
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
    def get_users(self):    
        try:
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()

            # Define your SQL SELECT query
            query = "SELECT userid, name, position FROM users LIMIT 10"
            cursor.execute(query)
            user_data = cursor.fetchall()
            for row in user_data:
                user_id, username, email = row
                print(f"User ID: {user_id}, Username: {username}, Email: {email}")

            cursor.close()
            self.conn.close()

            return user_data

        except Exception as e:
            print(f"Error: {e}")
            # Handle any exceptions here
            return "An error occurred."