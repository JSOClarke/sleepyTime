import { COLORS } from "@/constants/COLORS";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "./contexts/UserContext";

export default function Home() {
  const { userSettings, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user hasn't completed setup, redirect to onboarding
    if (!isLoading && !userSettings.isSetupComplete) {
      router.replace("/");
    }
  }, [userSettings.isSetupComplete, isLoading, router]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome back, {userSettings.name}! 👋
      </Text>
      <Text style={styles.subtitleText}>
        Your selected topic: {userSettings.topics[0]?.title || "None"}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.WHITE,
    padding: 20,
  },
  welcomeText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 24,
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  subtitleText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: COLORS.GRAY,
    marginBottom: 10,
  },
  statusText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: COLORS.GRAY,
    textAlign: "center",
  },
  loadingText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: COLORS.GRAY,
  },
});
