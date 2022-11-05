import { TextInput, Text, View, Dimensions, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
	const { login } = useContext(AuthContext);
	const navigation = useNavigation();

	return (
		<View className="flex items-center justify-center h-screen">
			<View className="bg-neutral-50 rounded-2xl p-6 w-80">
				<Text className="text-neutral-900 text-center font-normal text-2xl">Sign In</Text>

				<View className="mt-4 space-y-4">
					<TextInput
						className="bg-neutral-300 px-3 py-1 rounded-2xl"
						placeholder="Email"
						autoCapitalize="none"
					></TextInput>
					<TextInput
						className="bg-neutral-300 px-3 py-1 rounded-2xl"
						placeholder="Password"
						autoCapitalize="none"
						secureTextEntry={true}
					></TextInput>
					<TouchableOpacity
						className="bg-cyan-900 rounded-2xl px-4 py-2"
						onPress={() => {
							login();
						}}
					>
						<Text className="text-neutral-50 text-center text-xl">Next</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default SignIn;
