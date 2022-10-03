import { useContext } from "react";
import { Div, Icon, Text } from "react-native-magnus";
import { GuessContext } from "../../guessContext";
import { GuessedLetter } from "../index";
import Animated, { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Letter({ letter, inWord = null, inCorrectSpot = null }: GuessedLetter) {
  const { isMaxLength, guessLetter } = useContext(GuessContext);

  const config = {
    duration: 100,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        letter === null
          ? "#44555F"
          : inWord === null
          ? "#F5F5F5"
          : inWord
          ? inCorrectSpot
            ? "#38CE21"
            : "#FFB800"
          : "#708999",
        config
      ),
    };
  });

  return (
    <Div px={2}>
      <TouchableOpacity
        onPress={() => {
          if (letter === '-' || !isMaxLength) {
            guessLetter(letter);
          }
        }}
      >
        <Animated.View
          style={[
            {
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              height: 38,
              width: letter === '-' ? 45 : 32,
              backgroundColor: "#586F7C"
            },
            style,
          ]}
        >
          { letter === '-' ?
          <Icon color={'gray900'} fontSize={'3xl'} fontFamily={'Ionicons'} name={"backspace-outline"} />
        :
        <Text fontWeight={"bold"}>{letter}</Text>

        }
        </Animated.View>
      </TouchableOpacity>
    </Div>
  );
}
