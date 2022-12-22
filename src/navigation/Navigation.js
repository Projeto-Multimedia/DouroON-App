import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

import HomeScreen from "../screens/Home";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import Signup from "../screens/auth/Signup";
import SignIn from "../screens/auth/SignIn";
import ProfileSetup from "../screens/auth/ProfileSetup";
import EditProfileScreen from "../screens/EditProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import CompanyFeedScreen from "../screens/CompanyFeedScreen";
import FeedScreen from "../screens/FeedScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  const { isLoading, endUserToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer
      screenOptions={{ contentStyle: { backgroundColor: "#171717" } }}
    >
      <Stack.Navigator>
        {endUserToken == null ? (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: "#171717" },
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: "#171717" },
              }}
            />
            <Stack.Screen
              name="ProfileSetup"
              component={ProfileSetup}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: "#171717" },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: "#171717" },
              }}
            />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: "#171717" },
              }}
            />
            <Stack.Screen
              name="UserProfileScreen"
              component={UserProfileScreen}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: "#171717" },
              }}
            />
            <Stack.Screen
              name="CompanyFeedScreen"
              component={CompanyFeedScreen}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: "#171717" },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
