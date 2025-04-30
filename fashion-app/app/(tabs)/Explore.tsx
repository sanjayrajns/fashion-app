import React, { useRef, useState } from "react";
import { router } from "expo-router";
import { useClosetStore } from "../store";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const brandData = [
  { name: "Aritzia", image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb" },
  { name: "Asos", image: "https://images.unsplash.com/photo-1521334884684-d80222895322" },
  { name: "Best & Less", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
  { name: "Dangerfield", image: "https://images.unsplash.com/photo-1504593811423-6dd665756598" },
  { name: "Glassons", image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070" },
  { name: "Gorman", image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6" },
];

const trendingData = [
  { name: "Trendy 1", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { name: "Trendy 2", image: "https://images.unsplash.com/photo-1520976556042-92f6f35ff6af" },
  { name: "Trendy 3", image: "https://images.unsplash.com/photo-1504198266285-1659872e6590" },
  { name: "Trendy 4", image: "https://images.unsplash.com/photo-1535930749574-1399327ce78f" },
  { name: "Trendy 5", image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa" },
  { name: "Trendy 6", image: "https://images.unsplash.com/photo-1504087697492-238a6bf49ce8" },
];

export default function Explore() {
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState<"brands" | "trending">("brands");

  const handleTabPress = (tab: "brands" | "trending") => {
    setSelectedTab(tab);
    scrollRef.current?.scrollTo({ x: tab === "brands" ? 0 : width, animated: true });
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    setSelectedTab(x >= width / 2 ? "trending" : "brands");
  };

  const renderCards = (data: typeof brandData | typeof trendingData) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View className="bg-white rounded-xl overflow-hidden shadow-md w-[47%] h-64 mb-4 mx-[1.5%]">
          <Image
            source={{ uri: item.image }}
            className="h-full w-full absolute"
            resizeMode="cover"
          />
          <View className="flex-1 justify-center items-center bg-black/30">
            <Text className="text-white text-lg font-bold text-center px-2">
              {item.name}
            </Text>
          </View>
        </View>
      )}
    />
  );
  
  const cartItems = useClosetStore((state) => state.cartItems);

  return (
    <SafeAreaView className="flex-1 bg-white pt-4">
      {/* Tabs */}
      <View className="flex-row justify-between mb-4 bg-gray-100 mx-4 p-1 rounded-full">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-full ${selectedTab === "brands" ? "bg-white shadow" : ""}`}
          onPress={() => handleTabPress("brands")}
        >
          <Text className="text-center font-semibold text-sm">Brands</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 rounded-full ${selectedTab === "trending" ? "bg-white shadow" : ""}`}
          onPress={() => handleTabPress("trending")}
        >
          <Text className="text-center font-semibold text-sm">Trending</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mb-2 mx-4">
        <Ionicons name="search" size={18} color="gray" />
        <TextInput
          placeholder="Search items..."
          className="ml-2 flex-1 text-sm"
          placeholderTextColor="gray"
        />
      </View>

      {/* Swipeable Content */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        <View style={{ width, height: "100%" }}>{renderCards(brandData)}</View>
        <View style={{ width, height: "100%" }}>{renderCards(trendingData)}</View>
      </ScrollView>

      {/* Bottom Nav */}
    </SafeAreaView>
  );
}
