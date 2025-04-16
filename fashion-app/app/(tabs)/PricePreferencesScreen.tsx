import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

const priceRanges = [
  "$0-50",
  "$50-100",
  "$100-200",
  "$200-300",
  "$300-500",
  "$500+"
];

export default function PricePreferencesScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-20 pb-4">
      <View className="flex-row justify-center space-x-3  mb-8">
        {[0, 1, 2, 3, 4].map(i => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${i === 1 ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </View>

      <Text className="text-2xl font-bold text-center mb-1 mt-[8vh]">Price Preferences</Text>
      <Text className="text-center text-gray-500 mb-10 text-sm">
        This helps curate your feed but doesn’t set strict limits
      </Text>
      <View>
        {priceRanges.map((range, index) => (
          <TouchableOpacity
            key={range}
            onPress={() => setSelected(range)}
            className={`py-3 rounded-full border-2 px-4 items-center bg-white ${
              selected === range ? "border-black bg-gray-200" : "border-gray-300"
            } ${index !== priceRanges.length - 1 ? "mb-5" : ""}`}
          >
            <Text className="text-base font-medium text-black">{range}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        className={`py-3 rounded-lg  px-3 items-center ${
          selected ? "bg-black" : "bg-gray-300"
        }`}
        style={{ marginTop: 50 }}
        disabled={!selected}
        onPress={() => router.push("/(tabs)/SchoolSelectionScreen")}
      >
        <Text className="text-white text-xl text-center font-semibold">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
