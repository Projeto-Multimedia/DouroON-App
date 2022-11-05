import { Text, View, Dimensions, TouchableOpacity, ImageBackground, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { UserList } from "../components/UserList";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const WelcomeScreen = () => {
	const navigation = useNavigation();

	return (
		<View className="container mx-auto">
			<View className="space-y-6 p-6">
				<Text className="text-neutral-900 font-semibold text-2xl">Bem-vindo 👋</Text>
				<Text className="text-base text-neutral-700">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</Text>
				<TouchableOpacity
					className="bg-neutral-500 rounded-2xl px-8 py-4"
					onPress={() => navigation.navigate("Signup")}
				>
					<Text className="text-neutral-50 text-center text-2xl">Vamos começar!</Text>
				</TouchableOpacity>
			</View>
			<View className="flex flex-row justify-between mx-auto">
				<Text>-- </Text>
				<Text className="text-neutral-400 text-sm">OU</Text>
				<Text> --</Text>
			</View>
			<View className="mx-auto mt-6">
				<Text className="text-neutral-400">
					Já tem conta?
					<TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
						<Text className="text-neutral-500"> Faça login</Text>
					</TouchableOpacity>
				</Text>
			</View>
		</View>
	);
};

export default WelcomeScreen;
