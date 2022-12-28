import {Text, ScrollView,View,Image,RefreshControl,SafeAreaView,ActivityIndicator,Modal,Pressable, StyleSheet,TextInput,} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";

import { TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";

import DropDownPicker from "react-native-dropdown-picker";

import apiCompanyPlaces from "../services/api/company_places_api";
import apiUserRoutes from "../services/api/user_routes_api";

export const PlaceScreen = ({ route }) => {

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [profile, setProfile] = useState(null);

  const { endUserInfo } = useContext(AuthContext);
  const [userRoute, setUserRoute] = useState({
    route_name: '',
    profile_id: endUserInfo.profile_id,
  });

  const [allUserRoutes, setAllUserRoutes] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [choosenRoute, setChoosenRoute] = useState(null);

  const syncProfile = () => {
    setRefreshing(true);
    apiCompanyPlaces.getSingle(`${route.params.place_id}`).then((res) => {
        setProfile(res.data);
      })
      .then(() => setRefreshing(false));
  };

  const ModalVisible = (visible) => {
    setModalVisible(visible);
  };

 function addRoute(userRoute) {
    apiUserRoutes.post(userRoute, `${endUserInfo.profile_id}/create`).then((res) => {
        let arr = res;
        console.log(arr);
        setUserRoute(arr);
      })  
  }

  const getAllUserRoutes = () => {
    setDropdown(true);
    apiUserRoutes.getSingle(`${endUserInfo.profile_id}/routes`).then((res) => {
        let arr = res;
        console.log(arr.data);
        setAllUserRoutes(arr.data);
      })
  }

  const savePlace = async () => {
    try {
      const res = await fetch(
        `http://10.0.2.2:8000/api/save-places/${endUserInfo.profile_id}/${choosenRoute}/${route.params.place_id}/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

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
          {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <TextInput
              style={{height: 40, width: 200, borderColor: 'white', borderWidth: 1, 
              color: 'white', borderRadius: 10, paddingHorizontal: 10, marginRight: 10}}
              placeholder="Enter Route Name"
              placeholderTextColor="white"
              value={userRoute.route_name}
              onChangeText={(route_name) => setUserRoute({...userRoute, route_name})}
            />
            <TouchableOpacity className="bg-emerald-500 rounded-lg px-4 py-2"
                            onPress={() => addRoute(userRoute)} 
            >
              <Text className="text-neutral-50 font-medium text-center text-xl">
                Add Route
              </Text>
            </TouchableOpacity>
           </View> */}
           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
           <DropDownPicker
              items={allUserRoutes.map((item) => ({label: item.route_name, value: item.id}))}
              placeholder="Select a Route"
              defaultValue={choosenRoute}
              open = {dropdown}
              onOpen = {getAllUserRoutes}
              setValue = {setChoosenRoute}
              setItems = {setAllUserRoutes}
              onClose = {() => setDropdown(false)}
              containerStyle={{height: 40, width: 200,
              color: 'white', borderRadius: 10, paddingHorizontal: 10, marginRight: 10}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => setChoosenRoute(item)}
            />
            <TouchableOpacity className="bg-emerald-500 rounded-lg px-4 py-2"
                            onPress={() => savePlace()}    
            >
              <Text className="text-neutral-50 font-medium text-center text-xl">
                Save Place
              </Text>
            </TouchableOpacity>
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
    height: '50%',
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


