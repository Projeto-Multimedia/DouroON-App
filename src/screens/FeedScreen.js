import React, { useContext } from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import { AuthContext } from "../context/AuthContext";

import { FeedButtons } from "../components/FeedButtons";

export const FeedScreen = () => {
  const { endUserInfo } = useContext(AuthContext);

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          { flex: 1, height: Dimensions.get("window").height - 54 },
          index % 2 == 0
            ? { backgroundColor: "blue" }
            : { backgroundColor: "pink" },
        ]}
      >
        <Text>{item}</Text>
      </View>
    );
  };
  return (
    <View>
      <FeedButtons />
      <FlatList
        data={array}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item}
        decelerationRate={"normal"}
      />
    </View>
  );
};

export default FeedScreen;
