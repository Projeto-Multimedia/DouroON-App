import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

import Home from "../screens/Home";

const Stack = createStackNavigator();
const Navigation = () => {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerTitle: false,
				headerTransparent: true,
				headerBackTitleVisible: false,
				headerShown: false,
			}}
			cardStyle={{ backgroundColor: "#171717" }}
		>
			{}
		</Stack.Navigator>
	);
};
const AuthNavigation = () => {
	const { isLoading, endUserToken } = useContext(AuthContext);
	if (isLoading) {
		return (
			<View style={{ justifyContent: "center" }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}
	return (
		<NavigationContainer> {endUserToken !== null ? <Navigation /> : <AuthNavigation />}</NavigationContainer>
	);
};

export default AuthNavigation;
