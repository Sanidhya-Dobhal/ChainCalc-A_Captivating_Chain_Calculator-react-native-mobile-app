import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { backspace } from "@/Images";

export default function Buttons({ handler }: { handler(val: any): void }) {
  let arr = [
    ["1", "2", "backspace"],
    ["3", "4", "+"],
    ["5", "6", "-"],
    ["7", "8", "*"],
    ["9", "0", "/"],
    [".", "C", "="],
  ];
  return (
    <View style={styles.buttonGrid}>
      {arr.map((val, index) => {
        return (
          <View
            style={[{ flexDirection: "row" }, styles.buttonGrid]}
            key={index}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => handler(val[0])}
            >
              <Text style={{ textAlign: "center", fontSize: 30 }}>
                {val[0]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: val[1] === "C" ? "#cd6145" : "#ece9e2",
                  width: val.length === 2 ? 146 : 73,
                },
              ]}
              onPress={() => handler(val[1])}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  color: val[1] === "C" ? "white" : "black",
                }}
              >
                {val[1]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: val[2] === "=" ? "#333230" : "#d3cfca",
                },
              ]}
              onPress={() => handler(val[2])}
            >
              {val[2] === "backspace" ? (
                <Image source={backspace} style={{ width: 30, height: 30 }} />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    color: val[2] === "=" ? "white" : "black",
                  }}
                >
                  {val[2]}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGrid: {
    width: 260,
    marginHorizontal: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 7.74,
    backgroundColor: "rgb(236, 233, 226)",
    color: "black",
    margin: 6.2,
    borderWidth: 0,
    padding: 0,
    width: 73,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
});
