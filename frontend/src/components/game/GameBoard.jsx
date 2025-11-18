import { useEffect } from "react";

import { useGameStore } from "../../stores/gameStore.js";

import BaseWord from "./BaseWord";
import Timer from "./Timer.jsx";

function GameBoard() {
  const { isGameActive, timeLeft, decrementTime } = useGameStore();

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        decrementTime();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isGameActive, timeLeft, decrementTime]);

  return (
    <>
      <Timer/>
      <BaseWord />
    </>
  );
}

export default GameBoard;
