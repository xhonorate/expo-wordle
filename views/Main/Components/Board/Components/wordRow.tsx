import React, { useContext } from "react";
import { Div } from "react-native-magnus";
import { GuessContext } from "../../guessContext";
import { GuessedLetter } from "../../Keyboard/index";
import BoardLetter from "./letter";

interface WordRowProps {
  isCurrentGuess?: boolean;
  guessedLetters: GuessedLetter[];
}

export default function WordRow({ isCurrentGuess = false, guessedLetters }: WordRowProps) {
  const { word } = useContext(GuessContext);
  const toDisplay = [...guessedLetters];
  while (toDisplay.length < word.length) {
    toDisplay.push({ letter: null });
  }

  return (
    <Div row justifyContent={'center'} py={4}>
      {toDisplay.map((guessedLetter: GuessedLetter, idx) => {
        return <BoardLetter key={idx} idx={idx} isCurrent={isCurrentGuess} {...guessedLetter} />;
      })}
    </Div>
  );
}
