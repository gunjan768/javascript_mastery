import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => 
{
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [users, setUsers] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const ENDPOINT = 'http://localhost:5000/';

	useEffect(() => 
	{
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setRoom(room);
		setName(name)
		
		// Third argument passed to emit function is the callback function which receives error as an argument. This callback is triggered
		// from the server side ( see index.js inside server folder).
		socket.emit('join', { name, room }, error => 
		{
			if(error) 
			{
				alert(error);
			}
		});

	}, [ENDPOINT, location.search]);
	
	useEffect(() => 
	{
		socket.on('message', message => 
		{
			setMessages(messages => [ ...messages, message ]);
		});
		
		socket.on("roomData", ({ users }) => 
		{
			setUsers(users);
		});

	}, []);

	const sendMessage = event => 
	{
		event.preventDefault();

		if(message) 
		{
			// Similar to above emit method here also 3rd agrument is passed to emit is callback which is triggered from the server side.
			// This callback is used to tigger the setMessage() state which will clear the message.
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	}

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room = { room } />
				<Messages messages = { messages } name = { name } />
				<Input message = { message } setMessage = { setMessage } sendMessage = { sendMessage } />
			</div>
			<TextContainer users = { users }/>
		</div>
	);
}

export default Chat;