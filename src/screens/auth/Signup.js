import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation();

  const [end_user, setEndUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  return (
    <SafeAreaView>
      <ScrollView className="mt-8 p-5">
        <Text className="text-neutral-50 font-semibold text-3xl">
          Join DouroON
        </Text>
        <View className="mt-4 space-y-4">
          <Text className="text-xl text-neutral-50">Email</Text>
          <TextInput
            className="bg-neutral-900 border border-neutral-400 text-neutral-50 px-3 py-2 rounded-lg"
            placeholder="Your e-mail"
            placeholderTextColor={"#A3A3A3"}
            autoCapitalize="none"
            value={end_user.email}
            onChangeText={(email) => setEndUser({ ...end_user, email })}
          ></TextInput>
          <Text className="text-xl text-neutral-50">Password</Text>
          <TextInput
            className="bg-neutral-900 border border-neutral-400 text-neutral-50 px-3 py-2 rounded-lg"
            placeholder="Your password"
            placeholderTextColor={"#A3A3A3"}
            secureTextEntry={true}
            value={end_user.password}
            onChangeText={(password) => setEndUser({ ...end_user, password })}
          ></TextInput>
          <TouchableOpacity
            className="bg-neutral-50 rounded-lg px-4 py-2"
            onPress={() =>
              navigation.navigate("ProfileSetup", {
                email: end_user.email,
                password: end_user.password,
              })
            }
          >
            <Text className="text-neutral-900 text-center text-xl">Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
