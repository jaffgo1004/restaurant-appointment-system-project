import sqlite3

def get_db():
    conn = sqlite3.connect('restaurant.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS room (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, capacity INTEGER NOT NULL, status TEXT DEFAULT 'available')''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS package (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price_per_pax REAL NOT NULL, min_pax INTEGER NOT NULL, max_pax INTEGER NOT NULL)''')
    conn.commit()
    conn.close()
