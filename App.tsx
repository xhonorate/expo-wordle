import Main from "./views/Main";
import React, { useState } from "react";
import Start from "./views/Start";

export default function App() {
  const [word, setWord] = useState<string>();

  if (word) {
    return <Main word={word} backToLobby={() => setWord(null)} />;
  }
  return <Start onStart={setWord} />;
}
