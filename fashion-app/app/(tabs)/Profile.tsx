import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { useClosetStore } from "../store";

export default function Profile() {
  const profileOptions = [
    {
      label: "Past Orders",
      icon: <MaterialIcons name="history" size={20} color="black" />,
    },
    {
      label: "Share With a Friend",
      icon: <Feather name="share-2" size={20} color="black" />,
    },
    {
      label: "Report an Error",
      icon: <Feather name="alert-triangle" size={20} color="black" />,
    },
    {
      label: "Talk to a Founder",
      icon: <Feather name="phone-call" size={20} color="black" />,
    },
    {
      label: "Edit your Measurements",
      icon: <Feather name="edit" size={20} color="black" />,
    },
    {
      label: "Brand Blacklist",
      icon: <Feather name="slash" size={20} color="black" />,
    },
    {
      label: "Drop a Rating",
      icon: <Entypo name="star-outlined" size={20} color="black" />,
    },
  ];

  const cartItems = useClosetStore((state) => state.cartItems);

  return (
    <View className="flex-1 bg-gray-100 pt-12 px-4">
      {/* Header with Back Arrow */}
      <View className="flex-row items-center justify-center mb-4 relative">
        <TouchableOpacity onPress={() => router.back()} className="absolute left-0">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-center">Profile</Text>
      </View>

      {/* User Info Block */}
      <View className="bg-gray-200 p-4 rounded-xl mb-4">
        <Text className="text-base font-semibold">Username</Text>
        <Text className="text-sm text-gray-600">user@email.com</Text>
      </View>

      {/* Options List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {profileOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white p-4 rounded-xl flex-row items-center justify-between mb-3"
          >
            <View className="flex-row items-center space-x-3">
              {item.icon}
              <Text className="text-base mx-3">{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        ))}

        {/* Delete Account Button */}
        <TouchableOpacity className="mt-6 bg-black rounded-full py-4 items-center">
          <Text className="text-white font-semibold">Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}