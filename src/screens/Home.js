import { TextInput, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
	const { logout, endUserInfo } = useContext(AuthContext);
	return (
		<View className="flex items-center justify-center h-screen">
			<View className="bg-neutral-50 rounded-2xl p-6 w-80">
				<Text className="text-neutral-900 text-center font-normal text-2xl">Hello, {endUserInfo.username}! </Text>

				<TouchableOpacity
					className="bg-cyan-900 rounded-2xl px-4 py-2"
					onPress={() => {
						logout();
					}}
				>
					<Text className="text-neutral-50 text-center text-xl">Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Home;
