import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { calculatorIcon } from "../assets/pngLinks";
import { BackspaceIcon } from "../Images/";

export default function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: "auto",
      }}
    >
      <Image source={calculatorIcon} style={styles.headerImage} />
      <Text style={styles.headerText}>ChainCalc</Text>
      {/* <BackspaceIcon /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 38,
    height: 38,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 4,
  },
});
