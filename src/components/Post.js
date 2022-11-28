import React, { forwardRef, useRef } from "react";

import { Image, ImageBackground } from "react-native";

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
    </ImageBackground>
  );
});

export default PostSingle;
