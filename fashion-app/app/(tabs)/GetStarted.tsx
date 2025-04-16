import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

const brands = [
  "ARITZIA", "ASOS", "Best&Less", "DANGERFIELD", "DISH", "GAP",
  "GORMAN", "FOREVER NEW", "H&M", "JUST JEANS", "LULULEMON",
  "PETER ALEXANDER", "PRINCESS POLLY", "REVIEW", "UNIQLO" // ZARA removed
];

export default function HomeScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleBrand = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const goNext = () => {
    if (selected.length >= 3) {
      router.push('/(tabs)/PricePreferencesScreen');
    }
  };

  return (
    <View className="flex-1 bg-white px-4 pt-20 pb-10">
      
      <View className="flex-row justify-center mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${
              i === 0 ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      <Text className="text-center text-2xl font-bold mb-1">Let’s Start!</Text>
      <Text className="text-center text-gray-500 mb-4 text-sm">
        Pick 3 or more brands you love
      </Text>

      <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {brands.map((brand, index) => (
          <TouchableOpacity
            key={index}
            className={`m-2 w-20 h-20 rounded-full border-2 items-center justify-center ${
              selected.includes(brand) ? "bg-black border-black" : "border-gray-300"
            }`}
            onPress={() => toggleBrand(brand)}
          >
            <Text className={`text-center text-xs font-medium ${selected.includes(brand) ? "text-white" : "text-black"}`}>
              {brand}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        className={`py-4 rounded-lg items-center mt-4 ${
          selected.length >= 3 ? "bg-black" : "bg-gray-300"
        }`}
        disabled={selected.length < 3}
        onPress={goNext}
      >
        <Text className="text-center text-white font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
