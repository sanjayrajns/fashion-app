import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'), // adjust the path
  });
}