import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
  } from "react-native";
  
  import { IconSymbol } from "@/components/ui/IconSymbol";
  
  export default function AboutScreen() {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 px-4 py-8">
          <View className="mb-8 items-center">
            <Image
              source={require("@/assets/images/react-logo.png")}
              className="h-32 w-32 rounded-full"
            />
            <Text className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              À propos de nous
            </Text>
          </View>
  
          <View className="space-y-6">
            <View className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <Text className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Notre Mission
              </Text>
              <Text className="text-gray-700 dark:text-gray-300">
                Nous créons des applications innovantes en utilisant les dernières
                technologies comme React Native et Expo.
              </Text>
            </View>
  
            <View className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <Text className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Technologies
              </Text>
              <View className="flex-row flex-wrap gap-2">
                <View className="rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900">
                  <Text className="text-blue-800 dark:text-blue-100">
                    React Native
                  </Text>
                </View>
                <View className="rounded-full bg-green-100 px-3 py-1 dark:bg-green-900">
                  <Text className="text-green-800 dark:text-green-100">Expo</Text>
                </View>
                <View className="rounded-full bg-purple-100 px-3 py-1 dark:bg-purple-900">
                  <Text className="text-purple-800 dark:text-purple-100">
                    NativeWind
                  </Text>
                </View>
              </View>
            </View>
  
            <TouchableOpacity
              className="items-center rounded-lg bg-blue-500 p-4"
              onPress={() => console.log("Contact pressed")}
            >
              <Text className="font-semibold text-white">Contactez-nous</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }