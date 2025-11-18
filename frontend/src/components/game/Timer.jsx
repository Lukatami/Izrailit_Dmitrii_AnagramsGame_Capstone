import { useEffect } from "react";

import { useGameStore } from "../../stores/gameStore";
import { useGlobalStore } from "../../stores/globalStore";

function Timer() {
  const { timeLeft, decrementTime, isGameActive } = useGameStore();
  const { setGameOverStage } = useGlobalStore();

  useEffect(() => {
    if (!isGameActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameActive, decrementTime]);

  useEffect(() => {
    if (timeLeft <= 0 && isGameActive) {
      setGameOverStage();
    }
  }, [timeLeft, isGameActive, setGameOverStage]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString()} : ${secs.toString()}`;
  }

  return (
    <div className="game-timer">
      <h3>Time Left: {formatTime(timeLeft)}</h3>
    </div>
  );
}

export default Timer;
