import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { GuessedLetter } from "../Keyboard";
import { GuessContext } from "../guessContext";
import { Button, Div, Text } from "react-native-magnus";
import WordRow from "./Components/wordRow";
import { getWordList } from '../../../Start/index';

export const maxGuesses = 6;

export function guessedLettersToWord(guessedLetters: GuessedLetter[]) {
  return guessedLetters.reduce(
    (prev: string, guessedLetter: GuessedLetter) => prev + guessedLetter.letter,
    ""
  );
}

export default function Board() {
  const { isMaxLength, prevGuesses, guessedLetters, submitGuess } = useContext(GuessContext);

  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    if (isMaxLength && !wordList.length) {
      setWordList(getWordList(guessedLetters.length));
    }
  }, [isMaxLength, guessedLetters, wordList])

  const validWord = isMaxLength && wordList.includes(guessedLettersToWord(guessedLetters));

  return (
    <Div bg={"gray400"} px={10} pt={50} h={'100%'} pb={160}>
      {prevGuesses.map((guess, idx) => (
        <WordRow key={idx} guessedLetters={guess} />
      ))}
      <WordRow isCurrentGuess={true} guessedLetters={guessedLetters} />
      {[...Array(Math.max(0, maxGuesses - prevGuesses.length - 1)).fill([])].map((guess, idx) => (
        // fill in blank rows
        <WordRow key={idx} guessedLetters={guess} />
      ))}
      <Button
        alignSelf={'center'}
        rounded={'circle'}
        mt={24}
        mb={12}
        bg={!isMaxLength || validWord ? "blue400" : "red400"}
        disabled={!isMaxLength || !validWord}
        onPress={submitGuess}
      >
        <Text fontSize={'xl'} fontWeight={'bold'} color={"white"}>{!isMaxLength || validWord ? "SUBMIT" : "NOT A WORD"}</Text>
      </Button>
    </Div>
  );
}
