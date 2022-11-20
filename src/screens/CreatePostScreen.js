import { Text, View, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const { endUserInfo } = useContext(AuthContext);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (image) => {
    await fetch(`http://10.0.2.2:8000/api/user-posts/${endUserInfo.id}/create`, {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: image,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Success:", res.status + " - " + res.message);
        setEndUserInfo(res.data);
        AsyncStorage.setItem("endUserInfo", JSON.stringify(res.data));
      })
      .catch((err) => console.log("err: ", err));
  };

  return (
    <ScrollView className="container mt-8 p-5 flex-1 bg-neutral-900">
        <View className="flex flex-row justify-between items-center">
            <Text className="text-neutral-50 font-semibold text-2xl">
                New post
            </Text>
        </View>
        <Image
        className="mx-auto my-4"
        source={{
          uri: `http://10.0.2.2:8000/${endUserInfo.avatar}`,
        }}
        key={`http://10.0.2.2:8000/${endUserInfo.avatar}`}
        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
        resizeMode="cover"
      ></Image>
      <View className="flex flex-row justify-between items-center">
        <TextInput
          className="bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
          placeholder={"Location"}
          placeholderTextColor={"#A3A3A3"}
          autoCapitalize="none"
        ></TextInput>
        </View>
        <TextInput
          className="mt-4 bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
          placeholder={"Write a caption..."}
          placeholderTextColor={"#A3A3A3"}
          autoCapitalize="none"
        ></TextInput>
        <TouchableOpacity
        className="bg-emerald-500 rounded-lg px-2 py-2 mt-6 mx-20"
        onPress={() => pickImage()}
      >
        <Text className="font-medium text-neutral-50 text-center text-xl">
          Upload image
        </Text>
      </TouchableOpacity>
      <View className="mt-4 space-y-4"></View>
    </ScrollView>
  );
};

export default CreatePostScreen;
