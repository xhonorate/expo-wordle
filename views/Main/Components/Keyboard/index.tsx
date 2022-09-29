import { Div } from "react-native-magnus";
import Letter from "./Components/letter";

export interface GuessedLetter {
  letter: string;
  inWord?: boolean; //null if not yet guessed
  inCorrectSpot?: boolean; // null if not yet guessed
}

interface KeyboardProps {
  guessedLetters: { [letter: string]: GuessedLetter };
}

const letterRows = ["qwertyuiop".split(""), "asdfghjkl".split(""), "zxcvbnm".split("")];

export default function Keyboard({ guessedLetters }: KeyboardProps) {
  return (
    <Div
      position={"absolute"}
      bottom={0}
      left={0}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      w={"100%"}
      h={160}
      alignSelf={"flex-end"}
      bg={"blue300"}
      borderTopColor={'blue500'}
      borderTopWidth={4}
      py={8}
    >
      {letterRows.map((row: string[], idx: number) => (
        <Div key={idx} py={2} row w={"100%"} alignItems={"center"} justifyContent={"center"}>
          {row.map((letter: string) => (
            <Letter key={letter} letter={letter} {...guessedLetters?.[letter]} />
          ))}
        </Div>
      ))}
    </Div>
  );
}
