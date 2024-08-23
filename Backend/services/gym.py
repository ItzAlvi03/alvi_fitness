import sqlite3

def init_db():
    return sqlite3.connect("databases/gym.db")