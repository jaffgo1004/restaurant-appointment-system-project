import sqlite3

def get_db():
    conn = sqlite3.connect('restaurant.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Admin table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')

    # Room table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS room (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            capacity INTEGER NOT NULL,
            status TEXT DEFAULT 'available'
        )
    ''')

    # Package table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS package (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price_per_pax REAL NOT NULL,
            min_pax INTEGER NOT NULL,
            max_pax INTEGER NOT NULL
        )
    ''')

    # Reservation table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reservation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            date TEXT NOT NULL,
            time_slot TEXT NOT NULL,
            pax INTEGER NOT NULL,
            room_id INTEGER NOT NULL,
            package_id INTEGER NOT NULL,
            status TEXT DEFAULT 'pending',
            FOREIGN KEY (room_id) REFERENCES room(id),
            FOREIGN KEY (package_id) REFERENCES package(id)
        )
    ''')

    # Insert default admin
    cursor.execute('''
        INSERT OR IGNORE INTO admin (username, password) VALUES ('admin', 'admin123')
    ''')

    # Insert default rooms
    cursor.executemany('''
    INSERT OR IGNORE INTO room (id, name, capacity, status) VALUES (?, ?, ?, 'available')
''', [
    (1, 'Room 1 · The Crimson Suite', 20),
    (2, 'Room 2 · The Pearl Alcove', 10),
])

    # Insert default packages
    cursor.executemany('''
        INSERT OR IGNORE INTO package (id, name, price_per_pax, min_pax, max_pax) VALUES (?, ?, ?, ?, ?)
    ''', [
        (1, 'The Executive Table',    388, 1, 100),
        (2, 'The Anniversary Menu',   288, 1, 100),
        (3, 'The Family Feast',       218, 1, 100),
        (4, 'The Celebration Dinner', 318, 1, 100),
        (5, 'The Prestige Tasting',   688, 1, 100),
        (6, 'The Grand Brunch',       248, 1, 100),
    ])

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized!")
