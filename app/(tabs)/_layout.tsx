// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useClosetStore } from "../store"; // Corrected relative path
import { View, Text } from "react-native";

export default function Layout() {
  const cartItems = useClosetStore((state) => state.cartItems);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: "#e5e5e5",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          switch (route.name) {
            case "HomeScreen":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Closet":
              iconName = focused ? "shirt" : "shirt-outline";
              break;
            case "Explore":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Cart":
              iconName = focused ? "cart" : "cart-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          // Return with cart badge for Cart tab
          if (route.name === "Cart") {
            return (
              <View>
                <Ionicons name={iconName as any} size={24} color={focused ? "#000" : "#888"} />
                {cartItems.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -7,
                      backgroundColor: "red",
                      borderRadius: 10,
                      minWidth: 16,
                      height: 16,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {cartItems.length}
                    </Text>
                  </View>
                )}
              </View>
            );
          }

          return <Ionicons name={iconName as any} size={24} color={focused ? "#000" : "#888"} />;
        },
      })}
    >
      <Tabs.Screen name="HomeScreen" />
      <Tabs.Screen name="Closet" />
      <Tabs.Screen name="Explore" />
      <Tabs.Screen name="Cart" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}
