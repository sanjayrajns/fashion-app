import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Animated,
  Modal,
  FlatList,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { Ionicons } from "@expo/vector-icons";
import { useClosetStore } from "../store";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

type Card = {
  id: number;
  name: string;
  desc: string;
  image?: string;
  category: string;
};

const cards: Card[] = [
  {
    id: 1,
    name: "Saint Remy Top",
    desc: "Review\n$79",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
    category: "Minimalist Style",
  },
  {
    id: 2,
    name: "Barcelona Maxi Dress",
    desc: "Review\n$179",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Party Outfits",
  },
  {
    id: 3,
    name: "Nike Hoodie",
    desc: "Cozy and comfortable\n$99",
    image:
      "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/24541592/2023/9/14/f6205378-b47e-49e9-85e8-319371c45b911694686364710StyleCastRedShoulderStrapsMiniBodyconDress1.jpg",
    category: "Casual Wear",
  },
  {
    id: 4,
    name: "Adidas Sneakers",
    desc: "Run in style\n$120",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
    category: "Streetwear",
  },
];

const Dropdown = ({ label, options }: { label: string; options: string[] }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(label);

  return (
    <View className="relative mr-2">
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className="flex-row items-center bg-gray-100 px-5 py-3 rounded-full"
      >
        <Text className="text-base mr-2">{selected}</Text>
        <Ionicons name="chevron-down" size={16} />
      </TouchableOpacity>

      <Modal transparent={true} visible={visible} animationType="fade">
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-black/50"
          onPress={() => setVisible(false)}
        >
          <View className="bg-white p-4 rounded-xl w-[80%] max-h-[50%]">
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item);
                    setVisible(false);
                  }}
                  className="py-2"
                >
                  <Text className="text-base">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default function HomeScreen() {
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const saveCard = useClosetStore((state) => state.addToCloset);
  const addToCart = useClosetStore((state) => state.addToCart);

  const showSaveMessage = (message: string) => {
    setShowSavedMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowSavedMessage(false));
      }, 1000);
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-5">
      {/* Header */}
      <View className="mb-4 z-20">
        <View className="flex-row justify-between items-center mb-4">
          <Ionicons name="arrow-back" size={24} />
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 mx-3 text-base"
            placeholder="Search items..."
          />
          <Text className="font-bold text-xl">Stylize</Text>
        </View>

        {/* Filters */}
        <View className="flex-row items-center mt-2 mb-2">
          <TouchableOpacity className="mr-3 bg-gray-100 p-4 rounded-full">
            <Ionicons name="filter" size={20} />
          </TouchableOpacity>

          <Dropdown label="Brand" options={["Zara", "H&M", "Uniqlo"]} />
          <Dropdown label="Price" options={["Under $50", "$50–$100", "$100+"]} />
          <Dropdown label="Product" options={["Tops", "Dresses", "Shoes"]} />
        </View>
      </View>

      {/* Swiper */}
      <View className="flex-1 items-center justify-start z-0 mt-[-20px]">
        <Swiper
          cards={cards}
          renderCard={(card: Card) => (
            <TouchableOpacity
              activeOpacity={1} // <== disables tap animation
              onPress={() =>
                router.push({
                  pathname: "/Screens/Productdetails",
                  params: {
                    name: card.name,
                    image: card.image || "",
                    desc: card.desc,
                    category: card.category,
                  },
                })
              }
              className="w-[95%] h-[70%] rounded-2xl overflow-hidden bg-gray-100 shadow-md border border-gray-200"
            >
              <ImageBackground
                source={{ uri: card.image }}
                resizeMode="cover"
                className="flex-1 justify-end"
              >
                <View
                  style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                  className="w-full px-4 py-3 flex-row justify-between items-center"
                >
                  <View>
                    <Text className="text-white font-semibold text-sm">{card.name}</Text>
                    <Text className="text-white text-xs">{card.desc}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      saveCard({
                        id: card.id.toString(),
                        title: card.name,
                        image: card.image || "",
                        category: card.category.toLowerCase(),
                        desc: card.desc,
                      });
                      showSaveMessage("Saved!");
                    }}
                    className="p-2"
                  >
                    <Ionicons name="bookmark-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          onSwipedTop={(index) => {
            const item = cards[index];
            addToCart({
              id: item.id.toString(),
              title: item.name,
              image: item.image || "",
              category: item.category.toLowerCase(),
              desc: item.desc,
            });
            showSaveMessage("Added to Cart!");
          }}
          onSwipedLeft={() => {}}
          onSwipedRight={() => {}}
          stackSize={3}
          cardIndex={0}
          backgroundColor="transparent"
          verticalSwipe={true}
          horizontalSwipe={true}
          animateCardOpacity
          stackSeparation={14}
          cardVerticalMargin={20}
          infinite
        />
      </View>

      {/* Saved/Cart message */}
      {showSavedMessage && (
        <Animated.View
          style={{
            opacity: fadeAnim,
            position: "absolute",
            bottom: 100,
            alignSelf: "center",
            backgroundColor: "#000",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Saved!</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
