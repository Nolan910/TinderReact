import React, { useRef, useState } from "react";
import {StyleSheet,View,Text,SafeAreaView,Dimensions,TouchableOpacity,Image,} from "react-native";
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
    title: "Agathe",
    description: "Aime la photograpie et le dessin",
    image: "https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?s=612x612&w=0&k=20&c=CS0xj40eNCorQyzN1ImeMKlvPDocPHSaMsXethQ-Q_g=",
    age: 25,
  },
  {
    id: 2,
    title: "Personne 2",
    description: "Bio de personne 2",
    image: "https://media.istockphoto.com/id/1335941248/fr/photo/plan-dun-beau-jeune-homme-debout-sur-un-fond-gris.jpg?s=612x612&w=0&k=20&c=YK04b0z7MLjvJ1V88YvIDn8F5B_LUMP9CTaj4ffm6V0=",
    age: 22,
  },
  {
    id: 3,
    title: "Jean-Guillaume",
    description: "Amateur de randonées",
    image: "https://media.istockphoto.com/id/501289144/fr/photo/jeune-homme-de-randonn%C3%A9e-atteint-le-sommet-de-la-montagne-et-est-une-autophoto-portrait.jpg?s=612x612&w=0&k=20&c=EQIOGaKVMeP9LlAEeqP8tLVURoyv8EOFNZXEhc8ja-o=",
    age: 33,
  },
  {
    id: 4,
    title: "Personne 4",
    description: "Bio de personne 4",
    image: "https://media.istockphoto.com/id/1686871820/fr/photo/homme-gay-mature-dans-une-belle-robe-rouge-faisant-un-autoportrait-et-soufflant-un-baiser-sur.jpg?s=612x612&w=0&k=20&c=p7LCOyrZlE-KlwFtbAp4FL18cHEdN_S7EczpNfShNo4=",
    age: 46,
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
          <Text style={styles.cardAge}>{card.age} ans</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Swipe</Text>
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
  cardAge: {
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