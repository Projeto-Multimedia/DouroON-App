import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  Text,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import PostSingle from "../components/Post";

import apiUserPosts from "../services/api/posts_api";

export const FeedScreen = () => {
  const [posts, setPosts] = useState([]);

  const { endUserInfo } = useContext(AuthContext);
  const mediaRefs = useRef([]);

  const loadPosts = () => {
    apiUserPosts.getSingle(`${endUserInfo.id}/follows`).then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(loadPosts, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={[{ flex: 1, height: Dimensions.get("window").height - 54 }]}>
        <PostSingle
          item={item}
          ref={(PostSingleRef) => (mediaRefs.current[item.id] = PostSingleRef)}
        />
        <View className="flex flex-col px-8 absolute justify-center top-3/4 left-0 right-0 z-10">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-neutral-50 text-xl font-semibold">
              {item.user_info.name}
            </Text>
            <View className="flex flex-row justify-between items-center space-x-1">
              <Ionicons color={"#e5e5e5"} name={"navigate"} size={16} />
              <Text className="text-neutral-200 font-medium">
                {item.location}
              </Text>
            </View>
          </View>
          <View className="flex flex-col space-y-1">
            <Text className="text-neutral-200 font-semibold">
              @{item.user_info.username}
            </Text>
            <Text className="text-neutral-200 truncate">
              {item.description}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      <View className="flex flex-row justify-between px-11 absolute top-6 left-0 right-0 z-10">
        <TouchableOpacity>
          <Text className="font-semibold text-2xl text-center text-neutral-50">
            Following
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="font-semibold text-2xl text-center text-neutral-50">
            For You
          </Text>
        </TouchableOpacity>
      </View>
      {posts !== undefined && posts.length > 0 ? (
        <FlatList
          onRefresh={loadPosts}
          refreshing={false}
          data={posts}
          windowSize={8}
          initialNumToRender={3}
          renderItem={renderItem}
          pagingEnabled
          keyExtractor={(item) => item.id}
          decelerationRate={"normal"}
        ></FlatList>
      ) : (
        <View className="flex-1 flex justify-center items-center">
          <Text className="text-neutral-50 text-2xl font-semibold">
            No posts to show
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FeedScreen;
