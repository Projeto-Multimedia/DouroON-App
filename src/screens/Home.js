import { View } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import ProfileScreen from "./ProfileScreen";
import FeedScreen from "./FeedScreen";

const HomeScreen = () => {
	const Tab = createMaterialBottomTabNavigator()

	const EmptyScreen = () => {
		return <View></View>
	}

	return (
		<Tab.Navigator
		barStyle={{ backgroundColor: 'black' }}
		initialRouteName="feed">
		<Tab.Screen
			name="Home"
			component={FeedScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Ionicons name="home" size={24} color={color} />
				)
			}}
		/>
		<Tab.Screen
			name="Discover"
			component={EmptyScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Ionicons name="search" size={24} color={color} />
				)
			}}
		/>
		<Tab.Screen
			name="Add"
			component={EmptyScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Ionicons name="add-circle-outline" size={24} color={color} />
				)
			}}
		/>
		<Tab.Screen
			name="Inbox"
			component={EmptyScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Ionicons name="chatbubble-outline" size={24} color={color} />
				)
			}}
		/>
		<Tab.Screen
			name="Profile"
			component={ProfileScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Ionicons name="person-circle-outline" size={24} color={color} />
				),
			}}
		/>
	</Tab.Navigator>
	);
};

export default HomeScreen;
