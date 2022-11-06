import { TextInput, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();

  const [end_user, setEndUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  return (
  <View className="flex items-center justify-center h-screen">
      <View className="bg-neutral-50 rounded-2xl p-6 w-80">
        <Text className="text-neutral-900 text-center font-normal text-2xl">Sign Up</Text>

        <View className="mt-4 space-y-4">
          <TextInput
            className="bg-neutral-300 px-3 py-1 rounded-2xl"
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(email) => setEndUser({ ...end_user, email })}
          ></TextInput>
          <TextInput
            className="bg-neutral-300 px-3 py-1 rounded-2xl"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(password) => setEndUser({ ...end_user, password })}
          ></TextInput>
          <TouchableOpacity
            className="bg-cyan-900 rounded-2xl px-4 py-2"
            onPress={() => navigation.navigate("ProfileSetup", { email: end_user.email, password: end_user.password })}
          >
            <Text className="text-neutral-50 text-center text-xl">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
  </View>
  )
}

export default Signup;