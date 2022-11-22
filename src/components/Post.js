import React, { forwardRef, useRef } from "react";

import { Image } from "react-native";

export const PostSingle = forwardRef(({item}, parentRef) => {
    const ref = useRef(null);

  return (
      <Image
      ref={ref}
      style={{ width: '100%', height: '100%' }}
      resizeMode="contain"
        source={{
          uri: `http://10.0.2.2:8000/${item.image}`
        }}
        key={item.id}
      ></Image>
  );
});

export default PostSingle;