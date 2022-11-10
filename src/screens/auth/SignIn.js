import { TextInput, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const SignIn = ({navigation}) => {
	const [end_user, setEndUser] = useState({
		username: "",
		password: "",
	});

	const { login } = useContext(AuthContext);
	

	return (
		<View className="mt-8 p-5">
				<Text className="text-neutral-50 font-semibold text-3xl">Sign In to DouroON</Text>
				<View className="mt-4 space-y-4">
					<Text className="text-xl text-neutral-50">Username</Text>
					<TextInput
						className="bg-neutral-900 border border-neutral-400 text-neutral-50 px-3 py-2 rounded-lg"
						placeholder="Your username"
						placeholderTextColor={"#A3A3A3"}
						autoCapitalize="none"
						value={end_user.username}
						onChangeText={(username) => setEndUser({ ...end_user, username })}
					></TextInput>
					<Text className="text-xl text-neutral-50">Password</Text>
					<TextInput
						className="bg-neutral-900 border border-neutral-400 text-neutral-50 px-3 py-2 rounded-lg"
						placeholder="Your password"
						placeholderTextColor={"#A3A3A3"}
						secureTextEntry={true}
						value={end_user.password}
						onChangeText={(password) => setEndUser({ ...end_user, password })}
					></TextInput>
					<TouchableOpacity>
						<Text className="text-emerald-500 font-medium">Forgot your password?</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="bg-neutral-50 rounded-lg px-4 py-2"
						onPress={() => {
							login(end_user);
						}}
					>
						<Text className="text-neutral-900 text-center text-xl">Login</Text>
					</TouchableOpacity>
				</View>
		</View>
	);
};

export default SignIn;
