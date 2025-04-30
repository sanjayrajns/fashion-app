// App.tsx or Navigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./app/(tabs)/HomeScreen";
import ClosetScreen from "./app/(tabs)/Closet";
import { Ionicons } from "@expo/vector-icons";
import 'expo-router/entry';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: any;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Closet") {
              iconName = "shirt-outline";
            } else if (route.name === "Explore") {
              iconName = "search";
            } else if (route.name === "Cart") {
              iconName = "cart-outline";
            } else if (route.name === "Profile") {
              iconName = "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Closet" component={ClosetScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
