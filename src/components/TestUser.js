import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { apiUsers } from '../services/api/user';

export function Users() {
    const [end_users, setUsers] = useState([]);

    useEffect(() => {
        _getUsers();
}, []);

function _getUsers() {
    apiUsers.getAll().then((res) => {
        console.log(res);
        let arr = _parseUsers(res.results.data);
        setUsers(arr);
    });
}

function _parseUsers(end_users) {
    return end_users.map((end_user) => {
        return end_user;
});
}

return (
    <Text>
      {end_users.map((end_user) => (
        <li key={end_user.id}>{end_user.name}</li>
      ))}
    </Text>
);
}

export default Users