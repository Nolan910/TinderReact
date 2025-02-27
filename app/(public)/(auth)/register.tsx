import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
  } from "react-native";
  import { useRouter } from "expo-router";
  
  export default function RegisterScreen() {
    const router = useRouter();
  
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 px-4 py-8">
          <View className="mb-8 items-center">
            <Image
              source={require("@/assets/images/react-logo.png")}
              className="h-32 w-32"
            />
            <Text className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              Créer un compte
            </Text>
          </View>
  
          <View className="space-y-4">
            <View>
              <Text className="mb-2 text-gray-700 dark:text-gray-300">Email</Text>
              <TextInput
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Entrez votre email"
                placeholderTextColor="#9CA3AF"
              />
            </View>
  
            <View>
              <Text className="mb-2 text-gray-700 dark:text-gray-300">
                Mot de passe
              </Text>
              <TextInput
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Entrez votre mot de passe"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            </View>
  
            <View>
              <Text className="mb-2 text-gray-700 dark:text-gray-300">
                Confirmer le mot de passe
              </Text>
              <TextInput
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Confirmez votre mot de passe"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            </View>
  
            <TouchableOpacity
              className="mt-6 rounded-lg bg-blue-500 p-4"
              onPress={() => console.log("Register pressed")}
            >
              <Text className="text-center font-semibold text-white">
                S'inscrire
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              className="mt-4"
              onPress={() => router.push("/login")}
            >
              <Text className="text-center text-blue-500">
                Déjà un compte ? Connectez-vous
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }