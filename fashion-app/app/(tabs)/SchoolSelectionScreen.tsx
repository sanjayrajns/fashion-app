import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const schoolOptions = [
  "N/A",
  "Middle School",
  "High School",
  "Graduated",
  "Australian National University",
  "University of Sydney",
  "University of Melbourne",
  "University of Queensland",
  "University of New South Wales",
  "Monash University",
  "University of Western Australia",
  "University of Adelaide",
  "Macquarie University",
  "University of Technology Sydney",
  "Curtin University",
  "RMIT University",
  "La Trobe University",
  "University of Canberra",
  "Bond University",
  "Charles Sturt University",
  "Deakin University",
  "Griffith University",
  "Murdoch University",
  "Swinburne University of Technology",
  "University of Newcastle",
  "University of South Australia",
  "Victoria University",
  "Western Sydney University",
];

export default function SchoolSelectionScreen() {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredSchools = schoolOptions.filter((school) =>
    school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-20 pb-4">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        {/* Slide Indicator */}
        <View className="flex-row justify-center space-x-3 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <View
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${
                i === 2 ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </View>
        <Text className="text-3xl font-bold text-center mb-1">
          Select Your School
        </Text>
        <Text className="text-center text-gray-500 mb-6 text-sm">
          This is never made public. We ask to show trending clothes near you!
        </Text>
        <TextInput
          className="bg-gray-100 rounded-full px-5 py-5 mb-4 text-sm"
          placeholder="🔍    Search your school"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <View className="flex-1 mb-4">
          <FlatList
            data={filteredSchools}
            keyExtractor={(item) => item}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 12,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedSchool(item)}
                className={`border-2 rounded-full px-4 py-2 items-center justify-center flex-1 mx-1 ${
                  selectedSchool === item
                    ? "border-black bg-gray-200"
                    : "border-gray-300"
                }`}
              >
                <Text className="text-center text-sm font-medium text-black">
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        disabled={!selectedSchool}
        onPress={() => router.push("/(tabs)/MeasurementsScreen")}
        className={`py-4 rounded-lg items-center ${
          selectedSchool ? "bg-black" : "bg-gray-300"
        }`}
      >
        <Text className="text-white text-xl font-semibold">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
