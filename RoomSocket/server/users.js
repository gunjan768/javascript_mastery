const users = [];

const addUser = ({ id, name, room }) => 
{
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	if(!name || !room) 
	return { error: 'Username and room are required.' };

	const existingUser = users.find(user => user.room === room && user.name === name);

	if(existingUser) 
	return { error: 'Username is taken.' };

	const user = { id, name, room };

	users.push(user);

	return { user };
}

const removeUser = socketId => 
{
	const index = users.findIndex((user) => user.id === socketId);

	if(index !== -1) 
	return users.splice(index, 1)[0];
}

const getUser = id => users.find(user => user.id === id);

// filter() will return an array which has all those elements of an array ( original array and not the returned one ) that meet the 
// condition specified in a callback function.
const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };