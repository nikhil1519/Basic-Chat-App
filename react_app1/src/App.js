// // import React, { useState, useEffect } from 'react';
// // import io from 'socket.io-client';

// // const socket = io('http://localhost:5000');

// // function App() {
// //     const [messages, setMessages] = useState([]);
// //     const [message, setMessage] = useState('');
// //     const [recipientId, setRecipientId] = useState('');
// //     const [userId, setUserId] = useState('');

// //     useEffect(() => {
// //         socket.on('connect', () => {
// //             console.log('Connected to server');
// //         });

// //         socket.on('user_id', (id) => {
// //             setUserId(id);
// //             console.log('Received user ID:', id);
// //         });

// //         socket.on('message', (data) => {
// //             setMessages((prevMessages) => [...prevMessages, data]);
// //         });

// //         socket.on('disconnect', () => {
// //             console.log('Disconnected from server');
// //         });

// //         return () => {
// //             socket.off('connect');
// //             socket.off('user_id');
// //             socket.off('message');
// //             socket.off('disconnect');
// //         };
// //     }, []);

// //     const sendMessage = () => {
// //         socket.emit('message', { recipient_id: recipientId, message: message });
// //         setMessages((prevMessages) => [...prevMessages, { sender_id: 'Me', message: message }]);
// //         setMessage('');
// //     };

// //     return (
// //         <div>
// //             <h1>React Chat (Server)</h1>
// //             <div>Your User ID: {userId}</div>
// //             <ul>
// //                 {messages.map((msg, index) => (
// //                     <li key={index}>{msg.sender_id}: {msg.message}</li>
// //                 ))}
// //             </ul>
// //             <input
// //                 type="text"
// //                 placeholder="Recipient User ID"
// //                 value={recipientId}
// //                 onChange={(e) => setRecipientId(e.target.value)}
// //             />
// //             <input
// //                 type="text"
// //                 placeholder="Enter a message"
// //                 value={message}
// //                 onChange={(e) => setMessage(e.target.value)}
// //             />
// //             <button onClick={sendMessage}>Send</button>
// //         </div>
// //     );
// // }

// // export default App;





// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// function App() {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     const [recipientId, setRecipientId] = useState('');
//     const [userId, setUserId] = useState('');
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         const user_id = prompt("Enter your user ID");  // Replace with actual user ID logic
//         const app_id = 'ms360';  // or 'app2' for the second app
//         const compositeUserId = `${app_id}:${user_id}`;

//         const newSocket = io('http://localhost:5000', { query: { user_id: compositeUserId } });
//         setSocket(newSocket);

//         newSocket.on('connect', () => {
//             console.log('Connected to server');
//         });

//         newSocket.on('user_id', (id) => {
//             setUserId(id);
//             console.log('Received user ID:', id);
//         });

//         newSocket.on('message', (data) => {
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });

//         newSocket.on('disconnect', () => {
//             console.log('Disconnected from server');
//         });

//         return () => {
//             newSocket.off('connect');
//             newSocket.off('user_id');
//             newSocket.off('message');
//             newSocket.off('disconnect');
//         };
//     }, []);

//     const sendMessage = () => {
//         socket.emit('message', { recipient_id: recipientId, message: message });
//         setMessages((prevMessages) => [...prevMessages, { sender_id: 'Me', message: message }]);
//         setMessage('');
//     };

//     return (
//         <div>
//             <h1>React Chat</h1>
//             <div>Your User ID: {userId}</div>
//             <ul>
//                 {messages.map((msg, index) => (
//                     <li key={index}>{msg.sender_id}: {msg.message}</li>
//                 ))}
//             </ul>
//             <input
//                 type="text"
//                 placeholder="Recipient User ID"
//                 value={recipientId}
//                 onChange={(e) => setRecipientId(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Enter a message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// }

// export default App;






import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [userId, setUserId] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const user_id = prompt("Enter your user ID");  // Replace with actual user ID logic
        const app_id = 'ms360';  // or 'app2' for the second app
        const compositeUserId = `${app_id}:${user_id}`;

        const newSocket = io('http://localhost:5000', { query: { user_id: compositeUserId } });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('user_id', (id) => {
            setUserId(id);
            console.log('Received user ID:', id);
        });

        newSocket.on('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            newSocket.off('connect');
            newSocket.off('user_id');
            newSocket.off('message');
            newSocket.off('disconnect');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', { recipient_id: recipientId, message: message });
        setMessages((prevMessages) => [...prevMessages, { sender_id: 'Me', message: message }]);
        setMessage('');
    };

    return (
        <div className="chat-container">
            <h1>Spectrum  360</h1>
            <div className="user-info">Your User ID: {userId}</div>
            <div className="chat-window">
                <ul className="message-list">
                    {messages.map((msg, index) => (
                        <li key={index} className={`message-item ${msg.sender_id === 'Me' ? 'sent' : 'received'}`}>
                            <span className="sender-id">{msg.sender_id}</span>: {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Recipient User ID"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Enter a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field"
                />
                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
}

export default App;
