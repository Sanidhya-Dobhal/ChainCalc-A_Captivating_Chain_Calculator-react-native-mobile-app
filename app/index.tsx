import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Linking,
  Text,
  TouchableOpacity,
} from "react-native";
import Buttons from "@/Components/buttons";
import Header from "@/Components/header";
import ScreenView from "@/Components/screenView";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const scrollViewRef = useRef(null);
  const [ScreenState, setScreenState] = useState("");
  let [exp, setExp] = useState("");
  const [wasOp, setWasOp] = useState(false);
  const [retain, setRetain] = useState(false);
  const [finalRes, setFinalRes] = useState(0);
  const [color, setColor] = useState("black");
  const isEqualPressed = useRef(false);
  const deviceHeight = Dimensions.get("window").height;
  let fi1 = 0;

  useEffect(() => {
    if (isEqualPressed.current) {
      if (scrollViewRef.current) scrollViewRef.current.scrollTo({ x: 0 });
    } else {
      if (scrollViewRef.current) scrollViewRef.current.scrollToEnd();
    }
  }, [ScreenState]);
  function handler(val: string) {
    console.log("val at top", val);
    isEqualPressed.current = false;
    console.log(typeof val);
    let operators_arr = ["+", "-", "*", "/"];
    setColor("black");
    if (ScreenState === "Syntax Error" || ScreenState === "Enter number") {
      if (operators_arr.includes(val.trim()) || val === "=") {
        if (val === "=") isEqualPressed.current = true;
        setScreenState("Enter number");
      } else if (val === "backspace") {
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
          setWasOp(true);
        } else if (val === "=") {
          isEqualPressed.current = true;
          setExp(finalRes as unknown as string);
          fi1 = 1;
        } else if (val === "backspace") {
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
        if (val !== "backspace") setScreenState(val);
        setRetain(false);
      } else if (!operators_arr.includes(val.trim()) && wasOp === false) {
        setScreenState(ScreenState + val);
      } else {
        setScreenState(val);
        setWasOp(true);
        if (!operators_arr.includes(val.trim())) {
          setWasOp(false);
        }
      }
      if (val === "=") {
        isEqualPressed.current = true;
        if (exp !== "") {
          try {
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
      } else if (val === "backspace") {
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
    if (val === "C") {
      setScreenState("");
      setExp("");
      setColor("black");
      setRetain(false);
      setFinalRes(0);
    }
  }
  return (
    <View>
      {deviceHeight > 700 ? <Header /> : <></>}
      <View
        style={[styles.calcStyle, { margin: deviceHeight > 700 ? 48 : 24 }]}
      >
        <ScreenView
          screenState={ScreenState}
          color={color}
          scrollViewRef={scrollViewRef}
        />
        <Buttons handler={handler} />
      </View>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://sanidhya-dobhal.github.io/ChainCalc-A_Captivating_Chain_Calculator/"
          )
        }
      >
        <Text style={{ alignSelf: "center", color: "#1a73e8" }}>
          Check out the web app for more information
        </Text>
      </TouchableOpacity>
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
    alignSelf: "center",
  },
});
