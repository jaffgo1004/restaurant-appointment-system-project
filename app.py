from flask import Flask, render_template, request, jsonify
from database import get_db, init_db

app = Flask(__name__)
app.secret_key = 'velvetroom2026'

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/reserve', methods=['POST'])
def reserve():
    data = request.json
    conn = get_db()
    conn.execute('''
        INSERT INTO reservation (customer_name, phone, email, date, time_slot, pax, room_id, package_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (data['name'], data['phone'], data['email'], data['date'], data['time_slot'], data['pax'], data['room_id'], data['package_id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Reservation submitted!'})

if __name__ == '__main__':
    app.run(debug=True)
