import React, { useRef } from "react";
import { Div, Text, Button, Radio } from "react-native-magnus";
import { useState } from "react";

// Return a random int less than max (may be 0)
export function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// Return random item from array
export function randomChoice(arr: any[]) {
  return arr[randomInt(arr.length)];
}

export const getCommonList = (len: number) => {
  return len === 3
    ? require("../../3lettercommonwords.json")
    : len === 4
    ? require("../../4lettercommonwords.json")
    : len === 5
    ? require("../../5lettercommonwords.json")
    : len === 6
    ? require("../../6lettercommonwords.json")
    : len === 7
    ? require("../../7lettercommonwords.json")
    : len === 8
    ? require("../../8lettercommonwords.json")
    : ["yeast"];
};

export const getWordList = (len: number) => {
  return len === 3
    ? require("../../3letterwords.json")
    : len === 4
    ? require("../../4letterwords.json")
    : len === 5
    ? require("../../5letterwords.json")
    : len === 6
    ? require("../../6letterwords.json")
    : len === 7
    ? require("../../7letterwords.json")
    : len === 8
    ? require("../../8letterwords.json")
    : ["yeast"];
};

function chooseRandomWord(len: number): string {
  return randomChoice(getCommonList(len));
}

export default function Start({ onStart }: { onStart: (word: string) => void }) {
  const [wordSize, setWordSize] = useState(5);

  return (
    <Div w={"100%"} h={"100%"} bg={"blue200"} alignItems={"center"} justifyContent={"center"}>
      <Text color={"blue600"} fontSize={"5xl"} fontWeight={"bold"}>
        Woordle?
      </Text>
      <Div m={10} justifyContent={"center"}>
        <Radio.Group row defaultValue={wordSize} onChange={setWordSize}>
          {[3, 4, 5, 6, 7, 8].map((item) => (
            <Radio key={item} value={item}>
              {({ checked }) => (
                <Div bg={checked ? "blue600" : "blue100"} px={12} py="md" mx="md" rounded="circle">
                  <Text color={checked ? "white" : "gray800"}>{item}</Text>
                </Div>
              )}
            </Radio>
          ))}
        </Radio.Group>
      </Div>
      <Button
        mt={10}
        alignSelf={"center"}
        bg={"green400"}
        rounded={"circle"}
        onPress={() => {
          onStart(chooseRandomWord(wordSize));
        }}
      >
        <Text color={"white"} fontSize={"3xl"} fontWeight={"bold"}>
          Start
        </Text>
      </Button>
    </Div>
  );
}
