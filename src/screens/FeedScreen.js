import React, { useContext, useState, useEffect, useRef } from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import { AuthContext } from "../context/AuthContext";

import { FeedButtons } from "../components/FeedButtons";
import PostSingle from "../components/Post";

import apiUserPosts from "../services/api/posts_api";

export const FeedScreen = () => {
  const [posts, setPosts] = useState([]);

  const { endUserInfo } = useContext(AuthContext);
  const mediaRefs = useRef([]);

  const loadPosts = () => {
    apiUserPosts.getAll().then((res) => {
      setPosts(res);
    });
  };

  useEffect(loadPosts, []);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          { flex: 1, height: Dimensions.get("window").height - 54},
        ]}
      >
        <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)}/>
      </View>
    );
  };
  return (
    <View>
      <FeedButtons />
      <FlatList
        onRefresh={loadPosts}
        refreshing={false}
        data={posts}
        windowSize={8}
        initialNumToRender={3}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={item => item.id}
        decelerationRate={"normal"}
      />
    </View>
  );
  };

export default FeedScreen;