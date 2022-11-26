import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import apiEndUsers from "../../services/api/end_user_api";
import { Alert } from "../../components/Alert";

export const ProfileSetup = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [alertMessage, setAlertMessage] = useState(null);

  const { email, password } = route.params;

  const [end_user, setEndUser] = useState({
    email: email,
    password: password,
    username: "",
    name: "",
  });

  function _createEndUser(end_user) {
    apiEndUsers.post(end_user, "register").then((res) => {
      let arr = res;
      setAlertMessage(arr.message);
      setEndUser(arr);

      if (arr.status === "success") {
        navigation.navigate("SignIn");
      }
    });
  }

  return (
    <SafeAreaView>
      <ScrollView className="mt-8 p-5">
        <Text className="text-neutral-50 font-semibold text-3xl">Profile</Text>
        <Image
          className="mx-auto my-4"
          source={require("../../assets/avatar_default.png")}
        ></Image>
        <TouchableOpacity className="bg-neutral-50 rounded-lg px-4 py-2">
          <Text className="text-neutral-900 text-center text-xl">
            Add a profile picture
          </Text>
        </TouchableOpacity>
        <View className="mt-4 space-y-4">
          <Alert
            class="bg-red-100 font-semibold text-red-900 px-4 py-3 rounded"
            alert={alertMessage}
          />
          <Text className="text-xl text-neutral-50">Full name</Text>
          <TextInput
            className="bg-neutral-900 border border-neutral-400 text-neutral-50 px-3 py-2 rounded-lg"
            placeholder="ex: John Doe"
            placeholderTextColor={"#A3A3A3"}
            autoCapitalize="none"
            value={end_user.name}
            onChangeText={(name) => setEndUser({ ...end_user, name })}
          ></TextInput>
          <Text className="text-xl text-neutral-50">Username</Text>
          <TextInput
            className="bg-neutral-900 border border-neutral-400 text-neutral-50 px-3 py-2 rounded-lg"
            placeholder="Your username"
            placeholderTextColor={"#A3A3A3"}
            value={end_user.username}
            onChangeText={(username) => setEndUser({ ...end_user, username })}
          ></TextInput>
          <TouchableOpacity
            className="bg-neutral-50 rounded-lg px-4 py-2"
            onPress={() => _createEndUser(end_user)}
          >
            <Text className="text-neutral-900 text-center text-xl">Finish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSetup;
