import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useClosetStore, CardItem } from "../../store";

// Utility to normalize category names
const normalizeCategory = (category: string) =>
  category.toLowerCase().trim();

export default function ClosetCategoryScreen() {
  const { category } = useLocalSearchParams();
  const normalizedCategory = normalizeCategory(category as string);
  const savedItems = useClosetStore((state) => state.savedItems);

  const filteredItems: CardItem[] =
    normalizedCategory === "all saved"
      ? Object.values(savedItems)
          .map((cat) => cat.items)
          .flat()
      : savedItems[normalizedCategory]?.items || [];

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      <Text className="text-2xl font-bold mb-4 capitalize">
        {(category as string)?.replace(/-/g, " ") || "Category"}
      </Text>

      {filteredItems.length === 0 ? (
        <Text className="text-gray-500 text-center mt-10">
          No items saved in this category.
        </Text>
      ) : (
        <ScrollView>
          <View className="flex-row flex-wrap justify-between">
            {filteredItems.map((item) => (
              <View key={item.id} className="w-[48%] mb-4">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-48 rounded-xl"
                  resizeMode="cover"
                />
                <Text className="mt-2 font-semibold text-sm">{item.title}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
