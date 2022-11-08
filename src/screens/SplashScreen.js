import { Text, View } from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
  <View className="flex items-center justify-center h-screen">
      <View className="bg-neutral-50 rounded-2xl p-6 w-80">
        <Text className="text-neutral-900 text-center font-normal text-2xl">Splash Screen</Text>
      </View>
  </View>
  )
}

export default SplashScreen;