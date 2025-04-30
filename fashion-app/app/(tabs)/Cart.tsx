import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useClosetStore } from "../store";
import { router } from "expo-router";

export default function Cart() {
  const cartItems = useClosetStore((state) => state.cartItems);
  const removeFromCart = useClosetStore((state) => state.removeFromCart);

  const [isEditing, setIsEditing] = useState(false);

  const extractPrice = (desc: string | undefined) => {
    if (!desc) return 0;
    const match = desc.match(/\$([0-9.]+)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const total = cartItems.reduce((sum, item) => sum + extractPrice(item.desc), 0);

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-10">
      {/* Header with fake back arrow (non-functional on tab) */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3">
            <Ionicons name="arrow-back" size={24} color="gray" />
          </TouchableOpacity>
          <Text className="text-3xl font-bold">My Cart</Text>
        </View>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Ionicons
            name={isEditing ? "checkmark-outline" : "pencil-outline"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
        {cartItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              router.push({
                pathname: "/Screens/Productdetails",
                params: {
                  name: item.title,
                  image: item.image,
                  desc: item.desc,
                  category: item.category,
                },
              })
            }
            className="flex-row items-center bg-gray-100 p-3 mb-3 rounded-xl"
          >
            <Image
              source={{ uri: item.image }}
              className="w-16 h-20 rounded-lg mr-4"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="font-semibold text-sm">{item.title}</Text>
              <Text className="text-xs text-gray-600">Qty: 1</Text>
            </View>
            <Text className="font-semibold mr-2">
              ${extractPrice(item.desc).toFixed(2)}
            </Text>

            {isEditing && (
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Total + Pay (only if cart has items) */}
      {cartItems.length > 0 && (
        <View className="border-t border-gray-200 pt-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-base">Total:</Text>
            <Text className="font-bold text-base">${total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity className="bg-blue-600 rounded-full py-3 items-center">
            <Text className="text-white font-semibold">Proceed to Pay</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
