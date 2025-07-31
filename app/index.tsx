import { COLORS } from "@/constants/COLORS";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "./contexts/UserContext";
import Page1 from "./onboardingScreens/Page1";
import Page2 from "./onboardingScreens/Page2";

export default function onboarding() {
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const { updateUserProfile } = useUser();

  const handlePage2Complete = async (name: string, selectedTopic: string) => {
    const selectedTopicObj = {
      id: topics.find((t) => t.title === selectedTopic)?.id || 1,
      title: selectedTopic,
    };
    await updateUserProfile(name, [selectedTopicObj]);
    router.replace("/home");
  };

  const topics = [
    { id: 1, title: "Greek Mythology" },
    { id: 2, title: "History" },
    { id: 3, title: "Geography" },
    { id: 4, title: "Video Games" },
  ];

  const pages = [
    <Page1 key="page1" />,
    <Page2 key="page2" onComplete={handlePage2Complete} />,
  ];

  const handleNext = async () => {
    if (page < pages.length - 1) {
      setPage((prev) => prev + 1);
    } else {
      // The completion is now handled by Page2 component
      // No need to do anything here
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
