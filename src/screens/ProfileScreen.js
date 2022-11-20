import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout, endUserInfo } = useContext(AuthContext);

  return (
    <View className="container mt-8 p-5 flex-1 bg-neutral-900">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-neutral-50 font-semibold text-2xl">
          {endUserInfo.username}
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
          uri: `http://10.0.2.2:8000/${endUserInfo.avatar}`,
        }}
        key={`http://10.0.2.2:8000/${endUserInfo.avatar}`}
        style={{ width: 150, height: 150, borderRadius: 75 }}
        resizeMode="cover"
      ></Image>
      <Text className="text-neutral-50 font-semibold text-2xl text-center">
        {endUserInfo.name}
      </Text>
      <View className="mt-3 flex flex-row justify-evenly">
        <View>
          <Text className="font-medium text-2xl text-center text-neutral-50">
            3
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
      <TouchableOpacity
        className="bg-emerald-500 rounded-lg px-2 py-2 mt-6 mx-20"
        onPress={() => navigation.navigate("EditProfileScreen")}
      >
        <Text className="font-medium text-neutral-50 text-center text-xl">
          Edit profile
        </Text>
      </TouchableOpacity>
      <View className="mt-4 space-y-4"></View>
    </View>
  );
};

export default ProfileScreen;
