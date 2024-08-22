import sqlite3

conn = sqlite3.connect('databases/gym.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS user (
        username TEXT PRIMARY KEY,
        password TEXT NOT NULL
    )
''')
cursor.execute('''
    INSERT INTO user VALUES ("admin", "admin123")
''')

conn.commit()
conn.close()
