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

export const SpecificRouteScreen = ({route}) => {
  // Create state to hold all places inside a route and assign to data field in FlatList

  const { endUserInfo } = useContext(AuthContext);
  const [allUserRoutes, setAllUserRoutes] = useState([]);

  const navigation = useNavigation();

  // Create function to get all places inside a route
  const getPlaces = async () => {
    await fetch(
      `http://10.0.2.2:8000/api/save-places/${route.params.route_id}/saved`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setAllUserRoutes(res.data);
        console.log(res);
        
      }
      ).catch((err) => console.log(err));
  };


  // useEffect to call the function above when the page is loaded
  useEffect(() => {
    getPlaces();
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
      
              >
                <Text className="text-neutral-50">{item.name}</Text>
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

export default SpecificRouteScreen;
