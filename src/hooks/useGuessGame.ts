import generateNumber from "@/utils/generateNumber";
import { useState } from "react";

type GameStatus = "idle" | "playing" | "won" | "lost";

export function useGuessGame() {
  //состояние
  const [status, setStatus] = useState<GameStatus>("idle");
  const [secretNumber, setSecretNumber] = useState<number | null>(null);
  const [attempts, setAttemps] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  let [message, setMessage] = useState<string>("Жду ввода")
  // функции, которые меняют состояние
  function startGame() {
    const number = generateNumber();

    setSecretNumber(number);
    setAttemps(0);
    setHistory([]);
    setStatus("playing");
  }

  function makeGuess(value: number) {
    if (status !== "playing") {
      return;
    }

    setHistory([...history, value]);

    setAttemps(attempts + 1);

    if(value === secretNumber){
        setStatus("won")
    }else if(value < secretNumber!){
        setMessage("Ваше число меньше загадонного")
    }else{
        setMessage("Ваше число больше загадонного")
    }
  }
  //возвращаем наружу нужные данные
  return {
    status,
    attempts,
    history,
    startGame,
    makeGuess,
    secretNumber //для отладки и проверки
  }
}
