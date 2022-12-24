import {
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Image,
    RefreshControl,
    SafeAreaView,
    ActivityIndicator,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { Button } from "../components/Button";
  
  import apiCompanyPlaces from "../services/api/company_places_api";
  
  export const PlaceScreen = ({ route }) => {
    const navigation = useNavigation();
  
    const [refreshing, setRefreshing] = useState(false);
  
    const [profile, setProfile] = useState(null);
  
  
    const syncProfile = () => {
      setRefreshing(true);
      apiCompanyPlaces
        .getSingle(`${route.params.place_id}`)
        .then((res) => {
            setProfile(res.data);
        })
        .then(() => setRefreshing(false));
    };
  
  
    useEffect(syncProfile, []);
  
    return (
      <SafeAreaView className="mt-8 p-5 flex-1 bg-neutral-900">
        {profile !== null ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={syncProfile} />
            }
          >
            <View className="flex flex-row justify-between items-center">
              <Text className="text-neutral-50 font-semibold text-2xl">
                
              </Text>
            </View>
            <Image
              className="mx-auto my-4"
              source={{
                uri: `http://10.0.2.2:8000/${profile.image}`,
              }}
              key={`http://10.0.2.2:8000/${profile.image}`}
              style={{ width: 150, height: 150, borderRadius: 75 }}
              resizeMode="cover"
            ></Image>
            <Text className="text-neutral-50 font-semibold text-2xl text-center">
              {profile.name}
            </Text>
            <View className="mt-3 flex flex-row justify-evenly">
              <View>
                <Text className="font-medium text-2xl text-center text-neutral-50">
                  {profile.location}
                </Text>
                <Text className="text-neutral-300">{profile.address}</Text>
              </View>
              <View>
                <Text className="font-medium text-2xl text-center text-neutral-50">
                  {profile.phone}
                </Text>
              </View>
              <View>
                <Text className="font-medium text-2xl text-center text-neutral-50">
                  {profile.email}
                </Text>
                
              </View>
            </View>
            <Button
              color="bg-emerald-500"
              textWeight="font-medium"
              textColor="text-neutral-50"
              message="Save Location"
            />
          </ScrollView>
        ) : (
          <ActivityIndicator className="flex-1 justify-center" size="large" />
        )}
      </SafeAreaView>
    );
  };
  
  export default PlaceScreen;
  