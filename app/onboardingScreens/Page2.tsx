import { COLORS } from "@/constants/COLORS";
import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TopicCard from "../components/TopicCard";

const topics = [
  {
    id: 1,
    title: "Greek Mythology",
  },
  {
    id: 2,
    title: "History",
  },
  {
    id: 3,
    title: "Geography",
  },
  {
    id: 4,
    title: "Video Games",
  },
];

export default function Page2() {
  const [name, setName] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  return (
    <ImageBackground
      source={require("../../assets/images/cloudy.png")}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Hello</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.text}>,</Text>
      </View>
      <Text style={styles.text}>What brings you here?</Text>
      <Text style={styles.subtext}>
        Select the option that best describes you
      </Text>
      <View style={styles.topicContainer}>
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            selected={selectedTopic === topic.title}
            onPress={() => setSelectedTopic(topic.title)}
          />
        ))}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Manrope_700Bold",
    fontSize: 24,
    color: COLORS.BLACK,
    textAlign: "center",
  },
  subtext: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: COLORS.GRAY,
    textAlign: "center",
    marginTop: 10,
  },
  topicContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: COLORS.BLACK,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minWidth: 150,
    textAlign: "center",
  },
});
