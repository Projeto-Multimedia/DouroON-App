import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const CreatePostScreen = () => {
  const { endUserInfo } = useContext(AuthContext);

  const [post, setPost] = useState({
    enduser_id: endUserInfo.id,
    image: "",
    location: "",
    description: "",
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    console.log(endUserInfo.profile);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let fileType = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf(".") + 1,
      );
      let fileName = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1,
      );

      const data = new FormData();
      data.append("image", {
        uri: result.assets[0].uri,
        type: `image/${fileType}`,
        name: fileName,
      });

      setPost({ ...post, image: data });
    }
  };

  const _createPost = async (image) => {
    const data = new FormData();
    data.append("location", post.location);
    data.append("description", post.description);

    await fetch(
      `http://10.0.2.2:8000/api/${endUserInfo.profile}-posts/${endUserInfo.id}/create`,
      {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: image,
      },
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Success:", res.status + " - " + res.message);
        let arr = res.data;
        setPost({ arr });
      })
      .catch((err) => console.log("err: ", err));
    };

  return (
    <ScrollView className="container mt-8 p-5 flex-1 bg-neutral-900">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-neutral-50 font-semibold text-2xl">New post</Text>
      </View>
      <Image
        className="mx-auto my-4"
        source={{
          uri: `http://10.0.2.2:8000/${post.image}`,
        }}
        key={`http://10.0.2.2:8000/${post.image}`}
        style={{ width: "100%", height: undefined, aspectRatio: 1 }}
        resizeMode="cover"
      ></Image>
      <View className="flex flex-row justify-between items-center">
        <TextInput
          className="bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
          placeholder={"Location"}
          placeholderTextColor={"#A3A3A3"}
          autoCapitalize="none"
          onChangeText={(location) => setPost({ ...post, location })}
        ></TextInput>
      </View>
      <TextInput
        className="mt-4 bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
        placeholder={"Write a caption..."}
        placeholderTextColor={"#A3A3A3"}
        autoCapitalize="none"
        onChangeText={(description) => setPost({ ...post, description })}
      ></TextInput>
      <TouchableOpacity
        className="bg-emerald-500 rounded-lg px-2 py-2 mt-6 mx-20"
        onPress={() => pickImage()}
      >
        <Text className="font-medium text-neutral-50 text-center text-xl">
          Upload image
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-emerald-500 rounded-lg px-2 py-2 mt-6 mx-20"
        onPress={() => _createPost(post.image)}
      >
        <Text className="font-medium text-neutral-50 text-center text-xl">
          Create post
        </Text>
      </TouchableOpacity>
      <View className="mt-4 space-y-4"></View>
    </ScrollView>
  );
};

export default CreatePostScreen;
