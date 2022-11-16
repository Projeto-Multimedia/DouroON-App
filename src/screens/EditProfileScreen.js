import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';


const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { endUserInfo, updateProfile } = useContext(AuthContext);
  const [end_user, setEndUser] = useState({
    avatar:"",
    username: "",
    name: "",
  });

  const handleUpdate = () => {
    updateProfile(end_user);
    if(end_user.name.length >= 8  || end_user.name == "") 
    {
      navigation.goBack();
    } 
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    
    if (!result.canceled) {
      setEndUser({...end_user, avatar: result.assets[0].uri});
    }
    console.log(end_user.avatar);
  };


  return (
    <View className="mt-8 p-5">
      <Text className="text-neutral-50 font-semibold text-3xl">Profile</Text>
      <Image
        className="mx-auto my-4"
        source={require("../assets/avatar_default.png")}
      ></Image>
      <TouchableOpacity className="bg-neutral-50 rounded-lg px-4 py-2"
      onPress={() => {
            pickImage();
          }}
      >
        <Text className="text-neutral-900 text-center text-xl">
          Add a profile picture
        </Text>
      </TouchableOpacity>
      <View className="mt-4 space-y-4">
        <Text className="text-xl text-neutral-50">Full name</Text>
        <TextInput
          className="bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
          placeholder={endUserInfo.name}
          placeholderTextColor={"#A3A3A3"}
          autoCapitalize="none"
          onChangeText={(name) => setEndUser({ ...end_user, name })}
        ></TextInput>
        <Text className="text-xl text-neutral-50">Username</Text>
        <TextInput
          className="bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
          placeholder={endUserInfo.username}
          placeholderTextColor={"#A3A3A3"}
          onChangeText={(username) => setEndUser({ ...end_user, username })}
        ></TextInput>
        <TouchableOpacity
          className="bg-neutral-50 rounded-lg px-4 py-2"
          onPress={() => {
            handleUpdate();
          }}
        >
          <Text className="text-neutral-900 text-center text-xl">Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;
