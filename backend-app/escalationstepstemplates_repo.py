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
    def get_ExcaltionStepsTemplates(self, template_id):
        try: 
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()

            #SQL query
            query = "SELECT StepID,	Templateid,	Name,	Escalationpointtype,	EscalationPointid, sequence,	Tier,	Slatime   FROM escalationstepstemplates WHERE templateid=%s"
            cursor.execute(query,(template_id))
            escalationstepstemplates = cursor.fetchall()
            if escalationstepstemplates:
                escalationstepstemplates_list = []
                for row in escalationstepstemplates:
                    group_dict = {
                        "stepID": row[0],
                        "templateid": row[1],
                        "name": row[2],
                        "escalationpointtype":row[3],
                        "escalationPointid" : row[4],
                        "sequence" :row[5],	
                        "tier":row[6],	
                        "slatime":row[7]
                    }
                    escalationstepstemplates_list.append(group_dict)
                return escalationstepstemplates_list
            cursor.close()
            self.conn.close()

            return escalationstepstemplates
        except Exception as e:
            print(f"Error: {e}")
            return "An error occurred."
    def add_escalationstepstemplates(self,	Templateid,	Name,	Escalationpointtype,	EscalationPointid, sequence,	Tier,	Slatime):
        try:
            self.conn = psycopg2.connect(**self.db_params)
            cursor = self.conn.cursor()
            query = "INSERT INTO escalationstepstemplates (Templateid,	Name,	Escalationpointtype,	EscalationPointid, sequence,	Tier,	Slatime) VALUES (%i,%s, %s, %i, %i, %s, %i) RETURNING GroupOwenershipId"
            cursor.execute(query, (Templateid,	Name,	Escalationpointtype,	EscalationPointid, sequence,	Tier,	Slatime))
            new_GroupOwenership_id = cursor.fetchone()[0]
            self.conn.commit()

            cursor. close()
            
            return jsonify({"messaga": "GroupOwenership added succesfully", "GroupOwenershipId": new_GroupOwenership_id})
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": "An error occurred while adding the group"}), 500