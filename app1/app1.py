from flask import Flask, request
from flask_socketio import SocketIO, emit
import sqlite3

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

users = {}  # Maps session ID to composite user ID (app_id:user_id)

def get_user(user_id):
    conn = sqlite3.connect('app1.db')
    cursor = conn.cursor()
    cursor.execute('SELECT user_id, user_name FROM users WHERE user_id = ?', (user_id,))
    user = cursor.fetchone()
    conn.close()
    return user

@app.route('/')
def index():
    return "App 1: WebSocket Server"

@socketio.on('connect')
def handle_connect():
    composite_user_id = request.args.get('user_id')
    users[request.sid] = composite_user_id
    print(f'User {composite_user_id} connected')
    emit('user_id', composite_user_id)

@socketio.on('disconnect')
def handle_disconnect():
    composite_user_id = users.pop(request.sid, None)
    print(f'User {composite_user_id} disconnected')

@socketio.on('message')
def handle_message(data):
    recipient_id = data['recipient_id']
    message = data['message']
    sender_id = users[request.sid]
    print(f'Message from {sender_id} to {recipient_id}: {message}')

    recipient_sid = None
    for sid, uid in users.items():
        if uid == recipient_id:
            recipient_sid = sid
            break

    if recipient_sid:
        emit('message', {'sender_id': sender_id, 'message': message}, to=recipient_sid)
    else:
        emit('error', {'message': 'Recipient not connected'}, to=request.sid)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
