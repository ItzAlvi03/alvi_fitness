import sqlite3

def init_db():
    return sqlite3.connect("databases/gym.db")

def exists(username, password):
    conn = init_db()
    cur = conn.cursor()
    query = 'SELECT username FROM user WHERE username = ? AND password = ?'
    cur.execute(query, (username, password))
    result = cur.fetchone()
    conn.close()
    return result