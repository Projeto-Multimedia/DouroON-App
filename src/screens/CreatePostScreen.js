import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../components/Button";

const CreatePostScreen = () => {
  const { endUserInfo } = useContext(AuthContext);

  const [post, setPost] = useState({
    enduser_id: endUserInfo.id,
    image: "",
    location: "",
    description: "",
  });

  const [url, setUrl] = useState("");

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
      setUrl(result.assets[0].uri);
    }
  };

  const _createPost = async (image) => {
    const data = image;

    if (post.location) {
      data.append("location", post.location);
    }
    else if (post.description) {
      data.append("description", post.description);
    }
      
    console.log(data);

    await fetch(
      `http://10.0.2.2:8000/api/${endUserInfo.profile}-posts/${endUserInfo.id}/create`,
      {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: data,
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
    <SafeAreaView className="bg-neutral-900 flex-1">
    <ScrollView className="mt-8 p-5">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-neutral-50 font-semibold text-2xl">New post</Text>
      </View>
      {url ? 
      <Image
        className="mx-auto my-4"
        source={{ uri: url }}
        style={{ width: "100%", height: undefined, aspectRatio: 1 }}
        resizeMode="cover"
      ></Image>
      : null}
      <View>
        <TextInput
          className="mt-4 bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
          placeholder={"Location"}
          placeholderTextColor={"#A3A3A3"}
          autoCapitalize="none"
          value={post.location}
          onChangeText={(location) => setPost({ ...post, location: location })}
        ></TextInput>
        <TextInput
        className="mt-4 bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
        placeholder={"Write a caption..."}
        placeholderTextColor={"#A3A3A3"}
        autoCapitalize="none"
        value={post.description}
        onChangeText={(description) => setPost({ ...post, description: description })}
      ></TextInput>
      </View>
        <Button message="Upload image" textColor="text-neutral-900" color="bg-white" onPress={() => pickImage()}/>
        <Button message="Create post" textWeight="font-medium" textColor="text-neutral-50" color="bg-emerald-500" onPress={() => _createPost(post.image)}/>
    </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePostScreen;
