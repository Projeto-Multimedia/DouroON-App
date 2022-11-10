import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const FeedScreen = () => {

  const { endUserInfo } = useContext(AuthContext);

	return (
	<View className="mt-8 p-5 flex-1 bg-neutral-900">
        <View className="flex flex-row justify-between px-11">
        <TouchableOpacity>
            <Text className="font-semibold text-2xl text-center text-neutral-50">Following</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text className="font-semibold text-2xl text-center text-neutral-50">For You</Text>
        </TouchableOpacity>
        </View>
        <View className="flex items-center justify-center h-screen">
            <Text className="text-neutral-50 font-medium text-lg">You should follow someone first!</Text>
        </View>
    </View>
	);
};

export default FeedScreen;
