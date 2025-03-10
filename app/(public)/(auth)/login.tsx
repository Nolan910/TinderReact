import {
  View,
  Text,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import useUserStore from "@/store/user.store";
import { save } from "@/lib/utils/secure_store";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function LoginScreen() {
  const platform = Platform.OS;

  const router = useRouter();
  const { setIsAuthenticated, setUser }: any = useUserStore();
  const [fields, setFields] = useState({
    email: "exemple@gmail.com",
    password: "exemple",
  });

  const mutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const username = credentials.email;
      const password = credentials.password;
      return fetch("https://api-tinder-next.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((res) => res.json());
    },
    onSuccess: async (data) => {
      setIsAuthenticated(true);
      setUser(data);
      if (platform !== "web") {
        await save("token", data?.token as string);
      } else {
        localStorage.setItem("token", data?.token as string);
        router.push("/(private)/(tabs)");
      }
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ email: fields.email, password: fields.password });
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 px-4 py-8">
        {/* En-tête */}
        <View className="mb-8 items-center">
          <Image
            source={require("@/assets/images/react-logo.png")}
            className="h-32 w-32"
          />
          <Text className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Connexion
          </Text>
        </View>

        {/* Formulaire de connexion */}
        <View className="space-y-4">
          {/* Champ email */}
          <View>
            <Text className="mb-2 text-gray-700 dark:text-gray-300">Email</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Entrez votre email"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) =>
                setFields((prevState) => ({ ...prevState, email: text }))
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Champ mot de passe */}
          <View>
            <Text className="mb-2 text-gray-700 dark:text-gray-300">
              Mot de passe
            </Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Entrez votre mot de passe"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              onChangeText={(text) =>
                setFields((prevState) => ({ ...prevState, password: text }))
              }
            />
          </View>

          {/* Lien mot de passe oublié */}
          <TouchableOpacity
            className="mt-2 items-end"
            onPress={() => console.log("Mot de passe oublié")}
          >
            <Text className="text-blue-500">Mot de passe oublié ?</Text>
          </TouchableOpacity>

          {/* Bouton de connexion */}
          <TouchableOpacity
            className="mt-4 rounded-lg bg-blue-500 p-4"
            onPress={handleSubmit}
          >
            <Text className="text-center font-semibold text-white">
              Se connecter
            </Text>
          </TouchableOpacity>

          {/* Lien vers l'inscription */}
          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-700 dark:text-gray-300">
              Pas encore de compte ?{" "}
            </Text>
            <TouchableOpacity onPress={() => console.log("Inscription")}>
              <Text className="text-blue-500">S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}