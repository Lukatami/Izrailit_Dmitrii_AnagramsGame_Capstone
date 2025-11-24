import { useEffect } from "react";
import { useGameStore } from "../../stores/gameStore";

function TimerScoreCard() {
  const { timeLeft, decrementTime, isGameActive, gameOver, currentGame } =
    useGameStore();

  useEffect(() => {
    if (!isGameActive || gameOver || timeLeft <= 0) {
      return;
    }
    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameActive, gameOver, decrementTime]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins.toString()} : ${secs.toString()}`;
  }

  let timerColor = "text-emerald-300";
  if (timeLeft <= 10) timerColor = "text-red-500";
  else if (timeLeft <= 30) timerColor = "text-yellow-300";

  return (
    <div className="w-full bg-gradient-to-r from-slate-800/80 to-slate-700/70 text-white rounded-2xl p-3 flex items-center justify-between gap-4 shadow-lg">
      <div className="px-3 py-2 bg-white/6 rounded-lg flex flex-col items-center justify-center>">
        <div className="text-sm text-white/80">Time Left</div>
        <div className={`text-2xl font-bold ${timerColor}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-center">
        <div className="text-sm text-white/70">Base Word</div>
        <div className="text-lg font-semibold tracking-wider uppercase">
          {currentGame.baseWord}
        </div>
      </div>
      <div className="px-3 py-2 bg-white/6 rounded-lg flex flex-col items-center justify-center>">
        <div className="text-sm text-white/80">Total Score</div>
        <div className="text-2xl font-bold text-emerald-300">
          {currentGame.totalScore}
        </div>
      </div>
    </div>
  );
}

export default TimerScoreCard;
