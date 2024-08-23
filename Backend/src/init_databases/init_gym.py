import sqlite3

conn = sqlite3.connect('databases/gym.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
''')
cursor.execute('''
    INSERT INTO user (username, email, password) VALUES ("admin", "admin@admin.com", "admin123")
''')

conn.commit()
conn.close()
