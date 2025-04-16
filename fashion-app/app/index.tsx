import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import './globals.css';

export default function OnboardingScreen() {
  const router = useRouter();

  const brands = [
    { name: "ARITZIA" },
    { name: "ASOS" },
    { name: "BananaRep" },
    { name: "LANDEND" },
    { name: "BANANAREP" },
    { name: "GAP" },
    { name: "garment" },
    { name: "FOREVER" },
    { name: "FOREVER NEW" },
    { name: "H&M" },
    { name: "Levis" },
    { name: "LULU" },
  ];
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-4">
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <View className="flex-row flex-wrap justify-center gap-4 my-6 mt-20">
  {brands.map((brand, index) => (
    <View
      key={index}
      className={`w-20 h-20 rounded-full border border-gray-300 items-center justify-center ${
        index >= 4 ? 'ml-[10px]' : ''
      }`}
            >
              <Text className="text-[10px] text-center">{brand.name}</Text>
            </View>
          ))}
        </View>


        <Text className="font-poppins text-4xl font-bold text-black mb-2 mt-[8vh]">
          Swipe to stylize
        </Text>
        <Text className="font-poppins text-center text-gray-500 mb-6">
          Delve into fashion and personalize{"\n"}your likes with every swipe
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/GetStarted')}
          className="bg-red-500 px-[7vh] py-4 rounded-lg mb-2 mt-[10vh]"
        >
          <Text className="text-white text-[20px] font-semibold text-base">Get Started</Text>
        </TouchableOpacity>

        <Text className="text-[10px] text-blue-500 text-center mt-2">
          By continuing, you agree to our TOS and{"\n"} Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
