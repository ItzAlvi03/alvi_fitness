import sqlite3

def init_db():
    return sqlite3.connect("databases/gym.db")

def exists(email, password):
    conn = init_db()
    cur = conn.cursor()
    query = 'SELECT id FROM user WHERE email = ? AND password = ?'
    cur.execute(query, (email, password))
    result = cur.fetchone()
    conn.close()
    return result