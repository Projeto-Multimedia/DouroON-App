import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "../components/Button";

import apiProfileAccounts from "../services/api/user_profile_api";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout, endUserInfo, setAlert } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);

  const [profile, setProfile] = useState(null);

  const [posts, setPosts] = useState([]);

  const handleProfileEditNavigation = () => {
    setAlert("");
    navigation.navigate("EditProfileScreen");
  };

  const syncProfile = () => {
    setRefreshing(true);
    apiProfileAccounts
      .getSingle(`${endUserInfo.profile_id}/${endUserInfo.profile}-profile`)
      .then((res) => {
        setProfile({ ...res.data });
        setPosts([...res.data.userPosts]);
      })
      .then(() => setRefreshing(false));
  };

  const groupItems = (items, n) =>
    items.reduce((acc, val, i) => {
      const idx = Math.floor(i / n);
      acc[idx] = [...(acc[idx] || []), val];
      return acc;
    }, []);

  const renderPosts = () => {
    {
      return groupItems(posts, 3).map((row, index) => (
        <View key={index} className="flex flex-row">
          {row.map((post, index) => (
            <View key={index}>
              <Image
                className="mt-1 mx-1"
                source={{
                  uri: `http://10.0.2.2:8000/${post.image}`,
                }}
                key={`http://10.0.2.2:8000/${post.image}`}
                style={{ width: 100, height: 100 }}
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
      ));
    }
  };

  useEffect(syncProfile, []);

  return (
    <SafeAreaView className="mt-8 p-5 flex-1 bg-neutral-900">
      {profile !== null ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={syncProfile} />
          }
        >
          <View className="flex flex-row justify-between items-center">
            <Text className="text-neutral-50 font-semibold text-2xl">
              {profile.endUser.username}
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
              uri: `http://10.0.2.2:8000/${profile.endUser.avatar}`,
            }}
            key={`http://10.0.2.2:8000/${profile.endUser.avatar}`}
            style={{ width: 150, height: 150, borderRadius: 75 }}
            resizeMode="cover"
          ></Image>
          <Text className="text-neutral-50 font-semibold text-2xl text-center">
            {profile.endUser.name}
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
                {profile.numberOfFollowers}
              </Text>
              <Text className="text-neutral-300">Followers</Text>
            </View>
            <View>
              <Text className="font-medium text-2xl text-center text-neutral-50">
                {profile.numberOfFollowing}
              </Text>
              <Text className="text-neutral-300">Following</Text>
            </View>
          </View>
          <Button
            color="bg-emerald-500"
            textWeight="font-medium"
            textColor="text-neutral-50"
            message="Edit profile"
            onPress={() => handleProfileEditNavigation()}
          />
          {posts !== null ? (
            <View className="mt-3 mx-auto">{renderPosts()}</View>
          ) : (
            <ActivityIndicator size="large" color="#FFF" />
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator className="flex-1 justify-center" size="large" />
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
