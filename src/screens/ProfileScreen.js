import { Text, ScrollView, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "../components/Button";

import apiProfileAccounts from "../services/api/user_profile_api";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout, endUserInfo, setAlert } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    username: "",
    name: "",
    avatar: "",
    numberOfPosts: "",
  });

  const handleProfileEditNavigation = () => {
    setAlert("");
    navigation.navigate("EditProfileScreen")
  };

  const syncProfile = () => {
    
    apiProfileAccounts.getSingle(`${endUserInfo.profile_id}/${endUserInfo.profile}-profile`).then((res) => {
      console.log(endUserInfo);
      setProfile({
        username: res.data.endUser.username,
        name: res.data.endUser.name,
        avatar: res.data.endUser.avatar,
        numberOfPosts: res.data.numberOfPosts,
      });
    });
  };

  useEffect(syncProfile, []);

  return (
    <ScrollView className="container mt-8 p-5 flex-1 bg-neutral-900">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-neutral-50 font-semibold text-2xl">
          {profile.username}
        </Text>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
        >
          <Ionicons name="log-out-outline" size={24} color={"#FFF"} />
        </TouchableOpacity>
      </View>
      <Image
        className="mx-auto my-4"
        source={{
          uri: `http://10.0.2.2:8000/${profile.avatar}`,
        }}
        key={`http://10.0.2.2:8000/${profile.avatar}`}
        style={{ width: 150, height: 150, borderRadius: 75 }}
        resizeMode="cover"
      ></Image>
      <Text className="text-neutral-50 font-semibold text-2xl text-center">
        {profile.name}
      </Text>
      <View className="mt-3 flex flex-row justify-evenly">
        <View>
          <Text className="font-medium text-2xl text-center text-neutral-50">
            {profile.numberOfPosts}
          </Text>
          <Text className="text-neutral-300">Posts</Text>
        </View>
        <View>
          <Text className="font-medium text-2xl text-center text-neutral-50">
            432
          </Text>
          <Text className="text-neutral-300">Followers</Text>
        </View>
        <View>
          <Text className="font-medium text-2xl text-center text-neutral-50">
            224
          </Text>
          <Text className="text-neutral-300">Following</Text>
        </View>
      </View>
      <Button color="bg-emerald-500" textWeight="font-medium" textColor="text-neutral-50" message="Edit profile" onPress={() => handleProfileEditNavigation()}/>
      <View className="mt-4 space-y-4"></View>
    </ScrollView>
  );
};

export default ProfileScreen;
