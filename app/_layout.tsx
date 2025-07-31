import {
  Manrope_400Regular,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
