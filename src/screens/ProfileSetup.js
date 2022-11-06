import { TextInput, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';

import apiEndUsers from "../services/api/end_user_api";

const ProfileSetup = () => {
	const route = useRoute();
	const { email, password } = route.params;
	
	const [end_user, setEndUser] = useState({
		email: email,
		password: password,
		username: "",
		name: "",
	});

	function _createEndUser(end_user) {
		apiEndUsers.post(end_user, "register").then((res) => {
			let arr = res;
			setEndUser(arr);
			console.log(arr);
		});
	}

	return (
		<View className="flex items-center justify-center h-screen">
			<View className="bg-neutral-50 rounded-2xl p-6 w-80">
				<Text className="text-neutral-900 text-center font-normal text-2xl">Profile</Text>

				<View className="mt-4 space-y-4">
					<TextInput
						className="bg-neutral-300 px-3 py-1 rounded-2xl"
						placeholder="Name"
						autoCapitalize="none"
						onChangeText={(name) => setEndUser({ ...end_user, name })}
					></TextInput>
					<TextInput
						className="bg-neutral-300 px-3 py-1 rounded-2xl"
						placeholder="Username"
						autoCapitalize="none"
						onChangeText={(username) => setEndUser({ ...end_user, username })}
					></TextInput>
					<TouchableOpacity
						className="bg-cyan-900 rounded-2xl px-4 py-2"
						onPress={() => _createEndUser(end_user)}
					>
						<Text className="text-neutral-50 text-center text-xl">Finish</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ProfileSetup;
