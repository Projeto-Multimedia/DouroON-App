import {
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export const SpecificRouteScreen = () => {
  // Create state to hold all places inside a route and assign to data field in FlatList

  const { endUserInfo } = useContext(AuthContext);

  const navigation = useNavigation();

  // Create function to get all places inside a route

  // useEffect to call the function above when the page is loaded

  return (
    <SafeAreaView className="p-5 flex-1 bg-neutral-900">
      <FlatList
        data
        windowSize={8}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center justify-between mt-4">
            <View className="flex flex-row items-center"></View>
          </View>
        )}
        initialNumToRender={3}
        pagingEnabled
        decelerationRate={"normal"}
      ></FlatList>
    </SafeAreaView>
  );
};

export default SpecificRouteScreen;
