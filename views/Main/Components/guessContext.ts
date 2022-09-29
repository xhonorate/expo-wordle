import React from "react";
import { GuessedLetter } from "./Keyboard";

interface Guess {
  word: string;
  isMaxLength: boolean;
  prevGuesses: GuessedLetter[][];
  guessedLetters: GuessedLetter[];
  guessLetter: (letter: string | number) => void;
  submitGuess: () => void;
}

export const GuessContext = React.createContext<Guess>({
  word: '',
  isMaxLength: false,
  prevGuesses: [],
  guessedLetters: [],
  guessLetter: null,
  submitGuess: null,
});
