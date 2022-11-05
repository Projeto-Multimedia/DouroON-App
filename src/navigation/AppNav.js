import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

import WelcomeScreen from "../screens/WelcomeScreen";
import Signup from "../screens/Signup";
import SignIn from "../screens/SignIn";
import ProfileSetup from "../screens/ProfileSetup";
import Home from "../screens/Home";

const Stack = createStackNavigator();
const AppNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Welcome"
			screenOptions={{
				headerTitle: false,
				headerTransparent: true,
				headerBackTitleVisible: false,
				headerShown: false,
			}}
		>
			{}
			<Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
			<Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
			<Stack.Screen name="ProfileSetup" component={ProfileSetup} options={{ headerShown: false }} />
			<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};
const AppNav = () => {
	const { isLoading, userToken } = useContext(AuthContext);
	if (isLoading) {
		return (
			<View style={{ justifyContent: "center" }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}
	return (
		<NavigationContainer>{userToken !== null ? <Home /> : <AppNavigator />}</NavigationContainer>
	);
};

export default AppNav;
