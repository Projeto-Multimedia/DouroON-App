import { Text, View, TouchableOpacity, Image} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
	const navigation = useNavigation();

	return (
		<View className="container mx-auto flex justify-center items-center bg-neutral-900 h-full">
			<Image className="mx-auto my-4" source={require('../../assets/avatar_default.png')}></Image>
			<View className="space-y-6 p-6">
				<Text className="text-neutral-50 font-semibold text-2xl">Welcome 👋</Text>
				<Text className="text-base text-neutral-50">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</Text>
				<TouchableOpacity
					className="bg-emerald-500 rounded-lg px-8 py-4"
					onPress={() => navigation.navigate("Signup")}
				>
					<Text className="text-neutral-50 text-center text-2xl font-medium">Let's Get Started!</Text>
				</TouchableOpacity>
			</View>
			<View className="flex flex-row items-center">
				<View className="flex flex-1 h-[1px] bg-neutral-400"/>
				<View>
					<Text className="text-neutral-400 text-xs text-center px-2 uppercase">Or</Text>
				</View>
				<View className="flex flex-1 h-[1px] bg-neutral-400"/>
			</View>
			<View className="flex flex-row mx-auto mt-6">
				<Text className="text-neutral-400">Already have an account?</Text>
					<TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
						<Text className="text-emerald-500"> Sign in</Text>
					</TouchableOpacity>
			</View>
		</View>
	);
};

export default WelcomeScreen;
