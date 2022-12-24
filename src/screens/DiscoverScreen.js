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
import apiCompanyPlaces from "../services/api/company_places_api";

export const DiscoverScreen = () => {
  const navigation = useNavigation();

  const minimumSearchLength = 3;

  const [search, setSearch] = useState("");

  const [searchList, setSearchList] = useState([]);

  const [searchType, setSearchType] = useState(false);

  const { endUserInfo } = useContext(AuthContext);

  function handleSearch(text) {
    setSearch(text);
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (search.length >= minimumSearchLength && !searchType) {
        setSearchList([]);
        apiProfileAccounts
          .getSingle(`${search}/search/${endUserInfo.profile_id}`)
          .then((res) => {
            setSearchList(res.data);
          });
      }
      if (search.length >= minimumSearchLength && searchType) {
        setSearchList([]);
        apiCompanyPlaces.getSingle(`${search}/search/`).then((res) => {
          setSearchList(res.data);
        });
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [search]);

  return (
    <SafeAreaView className="mt-8 p-5 flex-1 bg-neutral-900">
      <View className="flex flex-row justify-between px-11 absolute top-6 left-0 right-0 z-10">
        <TouchableOpacity
          onPress={() => {
            setSearchList([]);
            search ? setSearch("") && setSearchType(false) :
            setSearchList([]);
            setSearchType(false);
          }}
        >
          <Text className="font-semibold text-2xl text-center text-neutral-50">
            Users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSearchList([]);
            search ? setSearch("") && setSearchType(true) : 
            setSearchList([]);
            setSearchType(true);
          }}
        >
          <Text className="font-semibold text-2xl text-center text-neutral-50">
            Places
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        className="mt-10 bg-neutral-900 border border-neutral-400 text-neutral-100 px-3 py-2 rounded-lg"
        placeholder={searchType ? "Search for a location" : "Search for a user"}
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
              {searchType ? (
                <TouchableOpacity>
                  <Text className="ml-3 text-neutral-100 font-semibold">
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("UserProfileScreen", {
                      profile_id: item.id,
                      profile: item.endUser.profile,
                    });
                  }}
                >
                  <Text className="text-neutral-50">
                    {item.endUser.username}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default DiscoverScreen;
