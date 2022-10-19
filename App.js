import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import Signup from "./src/screens/Signup";

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
			<Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

const App = () => {
  useEffect(() => {
    console.log("App mounted");
  }, []);
	return (
		<NavigationContainer>
			<AppNavigator />
		</NavigationContainer>
	);
};

export default App;
