import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useRef } from "react";
export default function ScreenView({
  screenState,
  color,
  scrollViewRef,
}: {
  screenState: string;
  color: string;
  scrollViewRef: React.MutableRefObject<null>;
}) {
  return (
    <View style={styles.screenStyles}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: screenState === "Enter number" ? 32.5 : 34.5,
            color: color,
            textAlignVertical: "center",
            marginRight: screenState === "Enter number" ? 0 : 16,
          }}
        >
          {screenState}
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  screenStyles: {
    width: 230,
    marginTop: 41,
    marginBottom: 16.62,
    alignSelf: "center",
    paddingHorizontal: 16,
    height: 76,
    borderRadius: 8,
    borderWidth: 1.51,
    borderColor: "rgba(1, 1, 1, 0.2)",
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "row",
  },
});
