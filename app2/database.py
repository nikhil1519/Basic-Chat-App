import sqlite3

conn = sqlite3.connect('app2.db')
cursor = conn.cursor()
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    user_name TEXT NOT NULL,
    app_id TEXT NOT NULL DEFAULT 'app2'
)
''')
conn.commit()
conn.close()
