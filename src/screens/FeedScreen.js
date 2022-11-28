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
      </View>
    );
  };
  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      {posts ? (
        <>
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
        </>
      ) : (
        <ActivityIndicator className="flex-1 justify-center" size="large" />
      )}
    </SafeAreaView>
  );
};

export default FeedScreen;
