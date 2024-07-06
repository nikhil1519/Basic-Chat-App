# from flask import Flask, request, jsonify
# from flask_socketio import SocketIO, emit
# from database import db
# from models import User, Message
# import uuid

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat2.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db.init_app(app)

# socketio = SocketIO(app, cors_allowed_origins="*")

# # Ensure tables are created when app starts
# with app.app_context():
#     db.create_all()

# @socketio.on('connect')
# def handle_connect():
#     print('Client connected')

# @socketio.on('disconnect')
# def handle_disconnect():
#     print('Client disconnected')

# @socketio.on('send_message')
# def handle_send_message(data):
#     sender_id = data['sender_id']
#     recipient_id = data['recipient_id']
#     message_text = data['message']
    
#     message = Message(
#         sender_id=sender_id,
#         recipient_id=recipient_id,
#         message=message_text
#     )
#     db.session.add(message)
#     db.session.commit()
    
#     emit('receive_message', {
#         'sender_id': sender_id,
#         'recipient_id': recipient_id,
#         'message': message_text
#     }, broadcast=False)

# @app.route('/messages/<user_id>', methods=['GET'])
# def get_messages(user_id):
#     messages = Message.query.filter((Message.sender_id == user_id) | (Message.recipient_id == user_id)).all()
#     messages_list = [{'sender_id': msg.sender_id, 'recipient_id': msg.recipient_id, 'message': msg.message, 'timestamp': msg.timestamp} for msg in messages]
#     return jsonify(messages_list)

# if __name__ == '__main__':
#     socketio.run(app, host='0.0.0.0', port=5001)







# =============================================================
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001)

