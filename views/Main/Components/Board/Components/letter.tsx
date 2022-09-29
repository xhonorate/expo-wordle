import React, { useContext, useMemo } from "react";
import { Button, Text, Div } from "react-native-magnus";
import Animated, { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { GuessedLetter } from "../../Keyboard/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GuessContext } from "../../guessContext";

export default function BoardLetter({
  isCurrent,
  letter,
  inWord,
  inCorrectSpot,
  idx,
}: GuessedLetter & { isCurrent: boolean, idx: number }) {
  const { guessLetter } = useContext(GuessContext);

  const config = {
    duration: 200,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(letter === null ? 0.4 : 1, config),
      backgroundColor: withTiming(
        letter === null
          ? "#44555F"
          : isCurrent
          ? "#F5F5F5"
          : inWord === null
          ? "#586F7C"
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
    <Div>
      <TouchableOpacity
        onPress={() => {
          if (isCurrent) {
            guessLetter(idx);
          }
        }}
      >
        <Animated.View
          style={[
            {
              width: 60,
              opacity: 0.6,
              margin: 4,
              maxWidth: 40,
              shadowRadius: 2,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 10,
            },
            style,
          ]}
        >
          <Text color={isCurrent ? "gray700" : "white"} fontSize={"2xl"} fontWeight={"bold"}>
            {letter ?? " "}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </Div>
  );
}
