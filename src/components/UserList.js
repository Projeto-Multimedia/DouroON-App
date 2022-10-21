import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import apiEndUsers from '../services/api/end_user_api';

export function UserList() {
  const [end_users, setUsers] = useState([]);

  useEffect(() => {
    _getEndUsers();
  }, []);

  function _getEndUsers() {
    apiEndUsers.getAll().then((res) => {
      let arr = res;
      setUsers(arr);
      console.log(arr);
    });
  }

  return (
    <FlatList data={end_users} renderItem={({item}) => <Text>{item.name} + {item.email} </Text>} />
  );
}