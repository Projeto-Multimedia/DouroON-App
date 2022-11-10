import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {

  const { logout, endUserInfo } = useContext(AuthContext);

	return (
		<View className="mt-8 p-5 flex-1 bg-neutral-900">
        <View className="flex flex-row justify-between">
        <Text className="text-neutral-50 font-semibold text-2xl">{endUserInfo.username}</Text>
        <TouchableOpacity 
        onPress={() => {
			logout();
			}}>
        <Ionicons name="log-out-outline" size={24} color={"#FFF"} />
        </TouchableOpacity>
        </View>
		  <Image className="mx-auto my-4" source={require('../assets/avatar_default.png')}></Image>
      <Text className="text-neutral-50 font-semibold text-2xl text-center">{endUserInfo.name}</Text>
      <View className="flex flex-row justify-between px-5">
      <View>
          <Text className="font-medium text-2xl text-center text-neutral-50">3</Text>
          <Text className="text-neutral-300">Posts</Text>
      </View>
      <View>
          <Text className="font-medium text-2xl text-center text-neutral-50">3</Text>
          <Text className="text-neutral-300">Followers</Text>
      </View>
      <View>
          <Text className="font-medium text-2xl text-center text-neutral-50">3</Text>
          <Text className="text-neutral-300">Following</Text>
      </View>
      </View>
	    <TouchableOpacity className="bg-emerald-500 rounded-lg px-4 py-2 mt-6 mx-20">
		  <Text className="font-medium text-neutral-50 text-center text-xl">Edit profile</Text>
        </TouchableOpacity>
          <View className="mt-4 space-y-4">
          </View>
      </View>
	);
};

export default ProfileScreen;
