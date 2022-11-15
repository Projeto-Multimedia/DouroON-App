import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navigation from "../navigation/Navigation";

const EditProfileScreen = () => {
  const navigation = Navigation();
  const { endUserInfo } = useContext(AuthContext);

  return (
    <View className="mt-8 p-5">
          <Text className="text-neutral-50 font-semibold text-3xl">Profile</Text>
		  <Image className="mx-auto my-4" source={require('../assets/avatar_default.png')}></Image>
		  <TouchableOpacity className="bg-neutral-50 rounded-lg px-4 py-2">
		  <Text className="text-neutral-900 text-center text-xl">Add a profile picture</Text>
		  </TouchableOpacity>
          <View className="mt-4 space-y-4">
            <Text className="text-xl text-neutral-50">Full name</Text>
            <TextInput
              className="bg-neutral-900 border border-neutral-400 text-neutral-400 px-3 py-2 rounded-lg"
              placeholder={endUserInfo.name}
              placeholderTextColor={"#A3A3A3"}
              autoCapitalize="none"
            ></TextInput>
            <Text className="text-xl text-neutral-50">Username</Text>
            <TextInput
              className="bg-neutral-900 border border-neutral-400 text-neutral-400 px-3 py-2 rounded-lg"
              placeholder={endUserInfo.username}
              placeholderTextColor={"#A3A3A3"}
            ></TextInput>
            <TouchableOpacity
              className="bg-neutral-50 rounded-lg px-4 py-2"
            >
              <Text className="text-neutral-900 text-center text-xl">Finish</Text>
            </TouchableOpacity>
          </View>
      </View>
  );
};

export default EditProfileScreen;
