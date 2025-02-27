import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { AntDesign } from "@expo/vector-icons";
import useUserStore from "@/store/user.store";
import { save } from "@/lib/utils/secure_store";
import { useRouter } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const tutorialCards = [
  {
    id: 1,
    title: "Bienvenue sur TinderClone!",
    description: "Apprenez à créer une app de rencontre avec React Native",
    image: "https://picsum.photos/id/1/400/600",
    tip: "👋 Swipez les cartes pour découvrir le tutoriel",
  },
  {
    id: 2,
    title: "React Native & Expo",
    description: "Un framework puissant pour créer des apps mobiles",
    image: "https://picsum.photos/id/2/400/600",
    tip: "💡 Utilisez les composants natifs pour de meilleures performances",
  },
  {
    id: 3,
    title: "Navigation & Auth",
    description: "Gérez la navigation et l'authentification",
    image: "https://picsum.photos/id/3/400/600",
    tip: "🔐 Protégez vos routes avec expo-router",
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Créez une interface utilisateur attrayante",
    image: "https://picsum.photos/id/4/400/600",
    tip: "✨ Animations fluides avec Reanimated",
  },
];

export default function HomeScreen() {
  const { setIsAuthenticated } = useUserStore();
  const router = useRouter();
  const swiperRef = useRef(null);
  const [cardIndex, setCardIndex] = useState(0);

  const logout = () => {
    setIsAuthenticated(false);
    save("isAuthenticated", "false");
    router.replace("/login");
  };

  const renderCard = (card) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: card.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardDescription}>{card.description}</Text>
          <Text style={styles.cardTip}>{card.tip}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TinderClone Tutorial</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <AntDesign name="logout" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={tutorialCards}
          renderCard={renderCard}
          onSwiped={(cardIndex) => setCardIndex(cardIndex)}
          onSwipedAll={() => console.log("Tutoriel terminé!")}
          cardIndex={cardIndex}
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            left: {
              title: "RETOUR",
              style: {
                label: {
                  backgroundColor: "#FF6B6B",
                  color: "white",
                  fontSize: 16,
                },
              },
            },
            right: {
              title: "SUIVANT",
              style: {
                label: {
                  backgroundColor: "#4ECDC4",
                  color: "white",
                  fontSize: 16,
                },
              },
            },
          }}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonLeft]}
          onPress={() => swiperRef.current.swipeLeft()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonRight]}
          onPress={() => swiperRef.current.swipeRight()}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  logoutButton: {
    padding: 8,
  },
  swiperContainer: {
    flex: 1,
  },
  card: {
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  cardDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  cardTip: {
    fontSize: 14,
    color: "#FF6B6B",
    fontStyle: "italic",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonLeft: {
    backgroundColor: "#FF6B6B",
  },
  buttonRight: {
    backgroundColor: "#4ECDC4",
  },
});