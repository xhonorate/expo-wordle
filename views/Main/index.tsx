import { useState, useReducer, useCallback } from "react";
import { Button, Div, Overlay, Text } from "react-native-magnus";
import Keyboard, { GuessedLetter } from "./Components/Keyboard";
import React from "react";
import { GuessContext } from "./Components/guessContext";
import Board, { guessedLettersToWord, maxGuesses } from "./Components/Board";

function checkLetter(word: string, letter: string, index: number): GuessedLetter {
  return {
    letter,
    inWord: word.includes(letter),
    inCorrectSpot: word.indexOf(letter) === index,
  };
}

// Flatten all guesses into simple list of letters
function getGuessedLetters(guesses: GuessedLetter[][]) {
  const letters = {};

  guesses.forEach((guess: GuessedLetter[]) => {
    guess.forEach((guessedLetter: GuessedLetter) => {
      const prevGuess = letters?.[guessedLetter.letter] ?? {};
      letters[guessedLetter.letter] = {
        letter: guessedLetter.letter,
        inWord: prevGuess.inWord || guessedLetter.inWord,
        inCorrectSpot: prevGuess.inCorrectSpot || guessedLetter.inCorrectSpot,
      };
    });
  });

  return letters;
}

export default function Main({ word, backToLobby }: { word: string; backToLobby: () => void }) {
  const [gameResult, setGameResult] = useState<"win" | "lose">(null);
  const [guesses, setGuesses] = useState<GuessedLetter[][]>([]);
  const [currentGuess, guessLetter] = useReducer<
    (state: GuessedLetter[], letter: string | number) => GuessedLetter[]
  >((state: GuessedLetter[], letter: string | number) => {
    if (typeof letter === "number") {
      // on tap of a letter, slice all following it
      if (letter === 0) return [];
      return state.slice(0, letter);
    } else {
      if (letter === "reset") {
        return []; //Reset the guess
      }
      if (letter === "-") { //Backspace
        return state.length === 0 ? [] : state.slice(0, state.length - 1); 
      }
      if (state.length === word.length) {
        return state; //do nothing
      } else {
        const newState = [...state, checkLetter(word, letter, state.length)];

        const thisLetterGuesses = newState.filter(guess => guess.letter === letter);
        // If this is the second+ time this letter is guessed the word
        if (thisLetterGuesses.length > 1) {
          const numOfThisLetter = word.split('').filter(char => char === letter).length;

          // how many times more we have guessed this letter than it is actually in the word
          let excessGuesses = thisLetterGuesses.length - numOfThisLetter;
          // If we have guessed more than are in the word, only mark up to that number as correct
          if (excessGuesses > 0) {
            // select from ones that are not actually in correct spot
            const dupes = thisLetterGuesses.filter(guess => !guess.inCorrectSpot);
            
            for (let i = dupes.length - 1; i >= 0; i--) {
              if (excessGuesses > 0) {
                // Back to front, dupe in wrong spot, dont highlight
                dupes[i].inWord = false;
                excessGuesses--;
              }
            }
          }
        };

        return newState;
      }
    }
  }, []);

  const submitGuess = useCallback(() => {
    const correctGuess = guessedLettersToWord(currentGuess) === word;

    console.log("Guess: ", guessedLettersToWord(currentGuess));

    if (correctGuess) {
      setGameResult("win");
    } else {
      if (guesses.length >= maxGuesses - 1) {
        setGameResult("lose");
      } 
      setGuesses([...guesses, [...currentGuess]]);
      guessLetter("reset"); 
    }
  }, [guesses, currentGuess]);

  return (
    <GuessContext.Provider
      value={{
        word,
        isMaxLength: currentGuess.length === word.length,
        prevGuesses: guesses,
        guessedLetters: currentGuess,
        guessLetter,
        submitGuess,
      }}
    >
      <Overlay alignItems={"center"} justifyContent={'center'} visible={gameResult !== null} p="xl">
        <Text py={8} fontWeight={"bold"} fontSize={"5xl"}>
          {gameResult === "win" ? "You Win!" : "You Lose..."}
        </Text>
        <Div row my={4} alignSelf={'center'}>
        {gameResult === "lose" && (
          <Button
            alignSelf={'center'}
            mx={4}
            rounded={"circle"}
            bg={"yellow600"}
            onPress={() => {
              setGuesses([]);
              guessLetter("reset");
              setGameResult(null);
            }}
          >
            <Text color={"white"} fontWeight={"bold"} fontSize={"3xl"}>Try Again</Text>
          </Button>
        )}
        <Button mx={4} rounded={"circle"} bg={"green500"} onPress={backToLobby}>
          <Text color={"white"} fontWeight={"bold"} fontSize={"3xl"}>
            Play Again
          </Text>
        </Button>
        </Div>
      </Overlay>
      <Div flexDir={"column"} h={"100%"}>
        <Board />
        <Keyboard guessedLetters={getGuessedLetters(guesses)} />
      </Div>
    </GuessContext.Provider>
  );
}
