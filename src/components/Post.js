import React, { forwardRef, useRef } from "react";

import { View, Image, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const PostSingle = forwardRef(({ item }, parentRef) => {
  const ref = useRef(null);

  return (
    <ImageBackground
      className="flex-1"
      ref={ref}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
      source={{
        uri: `http://10.0.2.2:8000/${item.image}`,
      }}
      key={item.id}
      opacity={0.1}
    >
      <Image
        className=""
        ref={ref}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
        source={{
          uri: `http://10.0.2.2:8000/${item.image}`,
        }}
        key={item.id}
      ></Image>
      <View className="bg-neutral-700 absolute left-[75%] top-[65%] rounded-xl py-1 px-2 flex flex-row items-center space-x-4">
        <TouchableOpacity>
          <Ionicons name={"heart-outline"} size={32} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name={"chatbubble-outline"} size={32} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
});

export default PostSingle;
