import { Redirect, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import useUserStore from "@/store/user.store";
import { getValueFor } from "@/lib/utils/secure_store";
import * as SecureStore from "expo-secure-store";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, setIsAuthenticated }: any = useUserStore();
  const [isReady, setIsReady] = useState(false);

  const checkIfUserIsAlreadyAuthenticated = async () => {
    const isAuthenticated = await getValueFor("isAuthenticated");
    if (isAuthenticated) {
      setIsAuthenticated(true);
    }
    setIsReady(true);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      checkIfUserIsAlreadyAuthenticated();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated && isReady) {
    return <Redirect href="/(public)/(auth)/login" />;
  }

  if (isAuthenticated) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Cool!",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "A propos de nous",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profil"
          options={{
            headerShown: false,
            title: "Profil",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }
}