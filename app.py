from flask import Flask, render_template, request, jsonify, session, redirect
from database import get_db, init_db

app = Flask(__name__)
app.secret_key = 'velvetroom2026'

init_db()

# ─── HOME ───────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')

# ─── GET ROOMS & PACKAGES ───────────────────────────────
@app.route('/api/rooms')
def get_rooms():
    conn = get_db()
    rooms = conn.execute('SELECT * FROM room').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rooms])

@app.route('/api/packages')
def get_packages():
    conn = get_db()
    packages = conn.execute('SELECT * FROM package').fetchall()
    conn.close()
    return jsonify([dict(p) for p in packages])

# ─── SUBMIT RESERVATION ─────────────────────────────────
@app.route('/api/reserve', methods=['POST'])
def reserve():
    data = request.json
    conn = get_db()

    # Check if room already booked at that date + time
    existing = conn.execute('''
        SELECT id FROM reservation 
        WHERE room_id=? AND date=? AND time_slot=? AND status != 'cancelled'
    ''', (data['room_id'], data['date'], data['time_slot'])).fetchone()

    if existing:
        conn.close()
        return jsonify({'success': False, 'message': 'This room is already booked at that time.'})

    conn.execute('''
        INSERT INTO reservation (customer_name, phone, email, date, time_slot, pax, room_id, package_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (data['name'], data['phone'], data['email'], data['date'], data['time_slot'], data['pax'], data['room_id'], data['package_id']))

    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Reservation submitted!'})

# ─── ADMIN LOGIN ─────────────────────────────────────────
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    conn = get_db()
    admin = conn.execute('SELECT * FROM admin WHERE username=? AND password=?',
                         (data['username'], data['password'])).fetchone()
    conn.close()
    if admin:
        session['admin'] = True
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'Invalid credentials'})

@app.route('/api/admin/logout', methods=['POST'])
def admin_logout():
    session.pop('admin', None)
    return jsonify({'success': True})

# ─── ADMIN — GET ALL RESERVATIONS ───────────────────────
@app.route('/api/admin/reservations')
def admin_reservations():
    if not session.get('admin'):
        return jsonify({'error': 'Unauthorized'}), 401
    conn = get_db()
    rows = conn.execute('''
        SELECT r.*, rm.name as room_name, p.name as package_name
        FROM reservation r
        JOIN room rm ON r.room_id = rm.id
        JOIN package p ON r.package_id = p.id
        ORDER BY r.date DESC
    ''').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

# ─── ADMIN — UPDATE RESERVATION STATUS ──────────────────
@app.route('/api/admin/reservation/<int:res_id>', methods=['PATCH'])
def update_reservation(res_id):
    if not session.get('admin'):
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    conn = get_db()
    conn.execute('UPDATE reservation SET status=? WHERE id=?', (data['status'], res_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ─── ADMIN — UPDATE ROOM STATUS ─────────────────────────
@app.route('/api/admin/room/<int:room_id>', methods=['PATCH'])
def update_room(room_id):
    if not session.get('admin'):
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    conn = get_db()
    conn.execute('UPDATE room SET status=? WHERE id=?', (data['status'], room_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
