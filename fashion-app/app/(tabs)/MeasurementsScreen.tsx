import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";

export default function MeasurementsScreen() {
  const [hip, setHip] = useState(42);
  const [waist, setWaist] = useState(32);
  const [bust, setBust] = useState(35);
  const [preferredFit, setPreferredFit] = useState(0.5);
  const [onlyMySize, setOnlyMySize] = useState(true);
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const router = useRouter();
  const isLoggedIn = false;

  const increment = (value: number, setter: (val: number) => void) =>
    setter(value + 1);
  const decrement = (value: number, setter: (val: number) => void) =>
    setter(value > 0 ? value - 1 : 0);

  const handleContinue = () => {
    if (isLoggedIn) {
      router.push("/(tabs)/Home");
    } else {
      router.push("/Login");
    }
  };

  const getButtonStyle = (id: string) =>
    `w-10 h-10 rounded-full items-center justify-center ${
      pressedButton === id ? "bg-gray-400" : "bg-black"
    }`;

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-20 pb-6">
      {/* Progress Dots */}
      <View className="flex-row justify-center space-x-3 mb-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${
              i === 3 ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </View>


      <View className="flex-row justify-between items-center mb-9">
  <View />
  <TouchableOpacity onPress={() => router.push("/Login")} className="mr-4">
    <Text className="text-xltext-base text-gray-500">Skip</Text>
  </TouchableOpacity>
</View>



      <Text className="text-3xl font-bold text-center mb-1">Measurements</Text>
      <Text className="text-center text-gray-500 mb-6 text-sm">
        Rounded to the nearest inch
      </Text>


      {[
        { label: "Hip", value: hip, setter: setHip },
        { label: "Waist", value: waist, setter: setWaist },
        { label: "Bust", value: bust, setter: setBust },
      ].map(({ label, value, setter }) => (
        <View
          key={label}
          className="flex-row justify-between items-center mb-8"
        >
          <TouchableOpacity
            className={getButtonStyle(`${label}-dec`)}
            onPressIn={() => setPressedButton(`${label}-dec`)}
            onPressOut={() => setPressedButton(null)}
            onPress={() => decrement(value, setter)}
          >
            <Text className="text-white text-xl">−</Text>
          </TouchableOpacity>

          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold">{value}</Text>
            <Text className="text-gray-500">{label}</Text>
          </View>

          <TouchableOpacity
            className={getButtonStyle(`${label}-inc`)}
            onPressIn={() => setPressedButton(`${label}-inc`)}
            onPressOut={() => setPressedButton(null)}
            onPress={() => increment(value, setter)}
          >
            <Text className="text-white text-xl">+</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View className="mt-6 mb-4">
        <Text className="text-base font-medium mb-2">
          My preferred fit is...
        </Text>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={preferredFit}
          onValueChange={setPreferredFit}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#ccc"
        />
        <View className="flex-row justify-between px-1 mt-1">
          <Text className="text-xs text-gray-500">Tight</Text>
          <Text className="text-xs text-gray-500">True to my size</Text>
          <Text className="text-xs text-gray-500">Oversized</Text>
        </View>
      </View>
      <View className="flex-row items-center mb-[10vh]">
        <Switch
          value={onlyMySize}
          onValueChange={setOnlyMySize}
          thumbColor={onlyMySize ? "#6B21A8" : "#000"} // Dark violet when ON, black when OFF
          trackColor={{ true: "#D8B4FE", false: "#ccc" }}
        />
        <Text className="ml-2 text-sm text-violet-600 font-medium">
          Only show items available in my size
        </Text>
      </View>
      <TouchableOpacity
        className="py-4 rounded-lg items-center bg-black"
        onPress={handleContinue}
      >
        <Text className="text-white text-xl font-semibold">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
