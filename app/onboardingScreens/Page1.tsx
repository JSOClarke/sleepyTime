import { COLORS } from "@/constants/COLORS";
import { Image, StyleSheet, Text, View } from "react-native";
export default function Page1() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/sleepyFront.png")}
        style={{ width: 332.22, height: 242.69 }}
      ></Image>
      <Text style={styles.text}>Fun Background Audio</Text>
      <Text style={styles.subtext}>
        Another sleep app but with a libary of sleep audio that its interesting.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontFamily: "Manrope_700Bold",
    fontSize: 24,
    color: COLORS.BLACK,
    marginTop: 20,
  },
  subtext: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: COLORS.GRAY,
    marginTop: 10,
    textAlign: "center",
  },
});
