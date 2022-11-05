import { TextInput, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const SignIn = ({navigation}) => {
	const [end_user, setEndUser] = useState({
		username: "",
		password: "",
	});

	const { login } = useContext(AuthContext);
	

	return (
		<View className="flex items-center justify-center h-screen">
			<View className="bg-neutral-50 rounded-2xl p-6 w-80">
				<Text className="text-neutral-900 text-center font-normal text-2xl">Sign In</Text>

				<View className="mt-4 space-y-4">
					<TextInput
						className="bg-neutral-300 px-3 py-1 rounded-2xl"
						placeholder="Username"
						autoCapitalize="none"
						value={end_user.username}
						onChangeText={(username) => setEndUser({ ...end_user, username })}
					></TextInput>
					<TextInput
						className="bg-neutral-300 px-3 py-1 rounded-2xl"
						placeholder="Password"
						autoCapitalize="none"
						secureTextEntry={true}
						value={end_user.password}
						onChangeText={(password) => setEndUser({ ...end_user, password })}
					></TextInput>
					<TouchableOpacity
						className="bg-cyan-900 rounded-2xl px-4 py-2"
						onPress={() => {
							login(end_user);
						}}
					>
						<Text className="text-neutral-50 text-center text-xl">Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default SignIn;
