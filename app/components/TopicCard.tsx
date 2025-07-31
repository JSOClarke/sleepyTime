import { COLORS } from "@/constants/COLORS";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface TopicCardProps {
  topic: {
    id: number;
    title: string;
  };
  onPress: () => void;
  selected: boolean;
}

export default function TopicCard({
  topic,
  onPress,
  selected,
}: TopicCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: COLORS.RANDOM_1[topic.id % COLORS.RANDOM_1.length],
          borderWidth: selected ? 2 : 0,
          borderColor: COLORS.PRIMARY,
          opacity: selected ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{topic.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: COLORS.WHITE,
    textAlign: "center",
  },
});
