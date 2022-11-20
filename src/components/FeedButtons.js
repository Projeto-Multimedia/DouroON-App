import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export const FeedButtons = () => {
  return (
    <View className="flex flex-row justify-between px-11">
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
  );
};
