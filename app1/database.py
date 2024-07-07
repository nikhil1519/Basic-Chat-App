import sqlite3

conn = sqlite3.connect('app1.db')
cursor = conn.cursor()
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    user_name TEXT NOT NULL,
    app_id TEXT NOT NULL DEFAULT 'app1'
)
''')
conn.commit()
conn.close()
