import {
  Text,
  ScrollView,
  View,
  Image,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Pressable, 
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";

import { TouchableOpacity } from "react-native";

import apiCompanyPlaces from "../services/api/company_places_api";

export const PlaceScreen = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  //create a function to change the modal visibility when TouchableOpacity is pressed
  const ModalVisible = (visible) => {
    setModalVisible(visible);
  };

  //create a return view to display the modal
  const ModalView = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select a Route Path</Text>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.title}>X</Text>
            </Pressable>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
              placeholder="Enter Route Name"
            />
           </View>
        </View>
      </Modal>
    );
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
            <Text className="text-neutral-50 font-semibold text-2xl"></Text>
          </View>
          <Image
            className="mx-auto mb-4"
            source={{
              uri: `http://10.0.2.2:8000/${profile.image}`,
            }}
            key={`http://10.0.2.2:8000/${profile.image}`}
            style={{ width: "100%", height: 250 }}
            resizeMode="cover"
          ></Image>
          <Text className="text-neutral-50 font-semibold text-2xl text-center">
            {profile.name}
          </Text>
          <Text className="font-medium text-lg text-center text-neutral-200">
            {profile.phone + " | " + profile.location}
          </Text>
          <View className="mt-3 flex flex-row justify-center">
            <Text className="text-neutral-300">{profile.address}</Text>
          </View>
         { modalVisible ? <ModalView /> : null}
          <TouchableOpacity className="bg-emerald-500 rounded-lg px-4 py-2"
                            onPress={() => ModalVisible(true)}
          >
            <Text className="text-neutral-50 font-medium text-center text-xl">
              Save Location
            </Text>
          </TouchableOpacity>

        </ScrollView>
      ) : (
        <ActivityIndicator className="flex-1 justify-center" size="large" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PlaceScreen;


