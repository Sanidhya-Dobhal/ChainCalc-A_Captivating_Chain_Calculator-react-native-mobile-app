import { StyleSheet, Text, View } from "react-native";
import Buttons from "@/Components/buttons";
import Header from "@/Components/header";
import ScreenView from "@/Components/screenView";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const scrollViewRef = useRef(null);
  const [ScreenState, setScreenState] = useState("");
  let [exp, setExp] = useState("");
  const [was_op, setWas_op] = useState(0);
  const [retain, setRetain] = useState(false);
  const [finalRes, setFinalRes] = useState(0);
  const [color, setColor] = useState("black");
  let fi1 = 0;
  useEffect(() => {
    if (scrollViewRef.current) scrollViewRef.current.scrollToEnd();
  }, [ScreenState]);
  function handler(val: string) {
    console.log(typeof val);
    let operators_arr = ["+", "-", "*", "/"];
    setColor("black");
    if (ScreenState === "Syntax Error" || ScreenState === "Enter number") {
      if (operators_arr.includes(val.trim()) || val === "=") {
        setScreenState("Enter number");
      } else if (val === "C") {
        setScreenState("");
      } else {
        setScreenState(val);
        setExp(val);
      }
    } else {
      if (retain) {
        if (operators_arr.includes(val.trim())) {
          setExp(finalRes as unknown as string);
          fi1 = 1;
          setWas_op(1);
        } else if (val === "=") {
          setExp(finalRes as unknown as string);
          fi1 = 1;
        } else if (val === "C") {
          console.log(
            "expression after C is ",
            String(finalRes).substring(0, String(finalRes).length - 1)
          );
          setExp(String(finalRes).substring(0, String(finalRes).length - 1));
          setScreenState(
            String(finalRes).substring(0, String(finalRes).length - 1)
          );
          console.log("The screen state is ", ScreenState);
          exp =
            String(finalRes).substring(0, String(finalRes).length - 1) + " "; //The " " is added because I know that the control of the code will go in a piece of code where the exp's last digit will be trimmed again therefore when that happens no data is lost and " " is trimmed
        }
        if (val !== "C") setScreenState(val);
        setRetain(false);
      } else if (!operators_arr.includes(val.trim()) && was_op === 0) {
        setScreenState(ScreenState + val);
      } else {
        setScreenState(val);
        setWas_op(1);
        if (!operators_arr.includes(val.trim())) {
          setWas_op(0);
        }
      }
      if (val === "=") {
        console.log("finalRes value is ", finalRes);
        if (exp !== "") {
          try {
            console.log("iddhhar");
            setScreenState(String(eval(exp)));
            setFinalRes(eval(exp));
            console.log(
              "The value of screenState and FinalRes is going to be: ",
              eval(exp)
            );
            setColor("green");
            setRetain(true);
          } catch (err) {
            setScreenState("Syntax Error");
          }
          setExp("");
        } else {
          setScreenState(ScreenState);
        }
      } else if (val === "C") {
        if (String(ScreenState).length > 0) {
          setScreenState(
            String(ScreenState).substring(0, String(ScreenState).length - 1)
          );
          setExp(String(exp).substring(0, String(exp).length - 1)); //We know exp would be null before setState, so let me set exp by equating it to the required exp
        } else {
          setScreenState(""); //Expression does not need any change when the screen is blank and ScreenState is set to null as otherwise we will get C on the display
        }
      } else {
        if (fi1 === 1) {
          setExp(finalRes + val);
        } else setExp(exp + val); //Adding the numbers to exp string
      }
      console.log(exp);
      console.log("The expression right now : ", exp);
    }
  }
  return (
    <View>
      <Header />
      <View style={styles.calcStyle}>
        <ScreenView
          screenState={ScreenState}
          color={color}
          scrollViewRef={scrollViewRef}
        />
        <Buttons handler={handler} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  calcStyle: {
    borderRadius: 32,
    borderWidth: 5,
    borderColor: "#4E4E4E",
    borderBottomWidth: 16,
    width: 330,
    height: 533,
    backgroundColor: "rgb(254,250,243)",
    margin: 48,
    alignSelf: "center",
  },
});
