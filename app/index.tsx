import { COLORS } from "@/constants/COLORS";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Page1 from "./onboardingScreens/Page1";
import Page2 from "./onboardingScreens/Page2";
export default function onboarding() {
  const [page, setPage] = useState<number>(0);
  const router = useRouter();

  const pages = [<Page1 />, <Page2 />];

  const handleNext = () => {
    if (page < pages.length - 1) {
      setPage((prev) => prev + 1);
    } else {
      router.replace("/home");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {pages[page]}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    textAlign: "center",
  },
});
