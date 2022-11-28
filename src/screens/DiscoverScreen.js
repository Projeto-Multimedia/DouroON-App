import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "../components/Button";
import apiProfileAccounts from "../services/api/user_profile_api";

export const DiscoverScreen = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");

  const [searchList, setSearchList] = useState([]);

  const { endUserInfo } = useContext(AuthContext);

  function handleSearch(text) {
    setSearch(text);
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (search.length > 3) {
        apiProfileAccounts
          .getSingle(`${search}/search/${endUserInfo.profile_id}`)
          .then((res) => {
            setSearchList(res.data);
          });
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [search]);

  return (
    <SafeAreaView className="mt-8 p-5 flex-1 bg-neutral-900">
      <TextInput
        className="bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
        placeholder="Search for a user..."
        placeholderTextColor={"#A3A3A3"}
        autoCapitalize="none"
        value={search}
        onChangeText={handleSearch}
      ></TextInput>
      <FlatList
        data={searchList}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center justify-between mt-4">
            <View className="flex flex-row items-center">
              {item.endUser.avatar ? (
                <Image
                  className="w-4 h-4 rounded-full"
                  source={{ uri: item.endUser.avatar }}
                  resizeMode="cover"
                ></Image>
              ) : (
                <ActivityIndicator size="small" color="#fff" />
              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UserProfileScreen", {
                    profile_id: item.id,
                    profile: item.endUser.profile,
                  });
                }}
              >
                <Text className="text-neutral-50">{item.endUser.username}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default DiscoverScreen;
