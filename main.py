from flask import Flask, jsonify
from airtable import Airtable
from flask_cors import CORS
import config

app = Flask(__name__)
CORS(app)

personal_access_token = config.personal_access_token
api_key = config.api_key
base_id = config.base_id
table_name = "Table 1"

airtable = Airtable(base_id, table_name, api_key)

@app.route('/fetchData', methods=['GET'])
def fetch_data():
    records = airtable.get_all(view='Grid view')
    return jsonify([record['fields'] for record in records])

if __name__ == '__main__':
    app.run(port=3000)
