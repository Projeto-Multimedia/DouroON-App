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

import apiUserRoutes from "../services/api/user_routes_api";

export const RoutesScreen = () => {
  const [allUserRoutes, setAllUserRoutes] = useState([]);

  const { endUserInfo } = useContext(AuthContext);

  const navigation = useNavigation();

  const getAllUserRoutes = () => {
    apiUserRoutes.getSingle(`${endUserInfo.profile_id}/routes`).then((res) => {
      let arr = res;
      setAllUserRoutes(arr.data);
    });
  };

  useEffect(() => {
    getAllUserRoutes();
  }, []);

  return (
    <SafeAreaView className="p-5 flex-1 bg-neutral-900">
      <FlatList
        data={allUserRoutes}
        windowSize={8}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center justify-between mt-4">
            <View className="flex flex-row items-center">
              <Pressable
                onPress={() => {
                  navigation.navigate("SpecificRouteScreen", {
                    route_id: item.id,
                  });
                }}
              >
                <Text className="text-neutral-50">{item.route_name}</Text>
              </Pressable>
            </View>
          </View>
        )}
        initialNumToRender={3}
        pagingEnabled
        decelerationRate={"normal"}
      ></FlatList>
    </SafeAreaView>
  );
};

export default RoutesScreen;
