import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  Modal,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useClosetStore } from "../store";

const presetImages = [
  "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
  "https://images.unsplash.com/photo-1521334884684-d80222895322",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598",
  "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  "https://images.unsplash.com/photo-1520976556042-92f6f35ff6af",
  "https://images.unsplash.com/photo-1521120413309-8ac6a997601c",
  "https://images.unsplash.com/photo-1520974722031-69e6b1b9cd4c",
];

export default function Closet() {
  const savedItems = useClosetStore((state) => state.savedItems);
  const addCategory = useClosetStore((state) => state.addCategory);
  const removeCategory = useClosetStore((state) => state.removeCategory);

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = Object.keys(savedItems).filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = () => {
    if (!newCategory.trim()) return;
    const key = newCategory.trim().toLowerCase();
    if (savedItems[key]) {
      Alert.alert("Category already exists!");
      return;
    }
    addCategory(newCategory.trim(), selectedImage || "");
    setNewCategory("");
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleRemoveCategory = (category: string) => {
    if (category.toLowerCase() === "all saved") {
      Alert.alert("Can't remove 'All Saved'");
      return;
    }
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete '${category}'?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => removeCategory(category) },
      ]
    );
  };

  const renderCategoryCard = ({ item }: { item: string }) => {
    const image = savedItems[item]?.image || savedItems[item]?.items[0]?.image;
    const fallbackImage = "https://via.placeholder.com/150/eeeeee/cccccc?text=No+Items";

    return (
      <TouchableOpacity
        onPress={() => router.push(`/Screens/ClosetCategory/${item}`)}
        onLongPress={() => handleRemoveCategory(item)}
        className="w-[48%] h-28 rounded-xl overflow-hidden mb-4 mr-2 border border-gray-300 bg-gray-50"
      >
        <ImageBackground
          source={{ uri: image || fallbackImage }}
          className="flex-1 justify-end p-3"
          imageStyle={{ borderRadius: 12, opacity: 0.9 }}
        >
          <View className="bg-black/50 rounded-md px-2 py-1">
            <Text className="text-white text-sm font-semibold">{item}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-10">
      {/* Header with back button */}
      <View className="flex-row items-center justify-center mb-4 relative">
        <TouchableOpacity onPress={() => router.back()} className="absolute left-0">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-center">Your Closets</Text>
      </View>

      {/* Search Row */}
      <View className="flex-row items-center mb-4">
        <TextInput
          placeholder="Search for a wishlist..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-sm"
        />
        <TouchableOpacity onPress={() => setShowModal(true)} className="ml-2">
          <Ionicons name="add-circle-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      {/* Category Grid */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderCategoryCard}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        className="mb-2"
      />

      {/* Create Closet Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-center px-6">
          <View className="bg-white rounded-xl p-6">
            <Text className="text-lg font-semibold mb-2 text-center">Create a Closet</Text>
            <Text className="text-sm mb-1">Choose a Closet Name:</Text>
            <TextInput
              placeholder="Enter a name..."
              value={newCategory}
              onChangeText={setNewCategory}
              className="border border-gray-300 rounded-md px-3 py-2 mb-4"
            />

            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-24 rounded-lg mb-3"
                resizeMode="cover"
              />
            )}

            <Text className="text-sm mb-2">Choose an Image:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row gap-2">
                {presetImages.map((uri) => (
                  <TouchableOpacity
                    key={uri}
                    onPress={() => setSelectedImage(uri)}
                    className={`w-12 h-12 rounded-full overflow-hidden justify-center items-center mr-2 ${
                      selectedImage === uri ? "border-2 border-black" : "border-2 border-transparent"
                    }`}
                  >
                    <Image source={{ uri }} className="w-full h-full rounded-full" />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  setNewCategory("");
                  setSelectedImage(null);
                }}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
              >
                <Text className="text-center text-sm font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCreateCategory}
                className="flex-1 bg-black rounded-full px-4 py-2 ml-2"
              >
                <Text className="text-white text-center text-sm font-medium">Create Closet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
