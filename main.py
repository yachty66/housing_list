from flask import Flask, jsonify, request
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
    approved_records = [record['fields'] for record in records if record['fields'].get('Validation') == 'approved']
    return jsonify(approved_records)


@app.route('/submit_community', methods=['POST'])
def submit_community():
    print("hallo")
    data = request.get_json()
    print(data)

    name = data.get('name')
    link = data.get('link')
    status = data.get('status')
    city = data.get('city')

    try:
        # Send the data to Airtable
        airtable.insert({
            'Name': name,
            'Link': link,
            'Status': status,
            'City': city,
            'Validation': 'pending',
        })

        # Return a success response
        return jsonify(success=True)
    except Exception as e:
        print(f"Error submitting form: {e}")
        return jsonify(success=False), 500


if __name__ == '__main__':
    app.run(port=3000)
