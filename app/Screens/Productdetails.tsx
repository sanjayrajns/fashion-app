// app/Screens/ProductDetails.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const sampleImages = [
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/24541592/2023/9/14/f6205378-b47e-49e9-85e8-319371c45b911694686364710StyleCastRedShoulderStrapsMiniBodyconDress1.jpg",
];

export default function ProductDetails() {
  const router = useRouter();
  const { name, desc, image, category } = useLocalSearchParams();
  const [selectedColor, setSelectedColor] = useState("Green");
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeIndex, setActiveIndex] = useState(0);

  const images = Array.isArray(image) ? image : [image, ...sampleImages];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 pb-2">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Product Details</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Image Carousel */}
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              className="w-screen"
              style={{ height: 500 }}
              resizeMode="cover"
            />
          )}
        />

        {/* Scroll Dots */}
        <View className="flex-row justify-center mt-6 mb-8">
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 6,
                backgroundColor: index === activeIndex ? "#000" : "#ccc",
              }}
            />
          ))}
        </View>

        {/* Content Section */}
        <View className="px-5 space-y-12 pb-20">
          {/* Brand and Name */}
          <View>
            <Text className="uppercase text-sm font-bold text-gray-500 mb-1">ZARA</Text>
            <Text className="text-2xl font-bold mb-1">{name}</Text>
            <Text className="text-lg text-gray-600 mb-4">$105</Text>
          </View>

          {/* Color Selection */}
          <View>
            <Text className="font-semibold text-base mb-4">Color</Text>
            <View className="flex-row space-x-4">
              {["Green", "Red"].map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full ${
                    selectedColor === color
                      ? "bg-gray-200"
                      : "border border-gray-300"
                  }`}
                >
                  <Text className="text-sm">{color}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Size Selection */}
          <View>
            <Text className="font-semibold text-base mb-3 mt-5">Size</Text>
            <View className="flex-row flex-wrap gap-3">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded-full mb-[5vh] ${
                    selectedSize === size
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <Text className="text-sm">{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity className="bg-black rounded-full py-4 items-center">
            <Text className="text-white font-semibold text-base">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
