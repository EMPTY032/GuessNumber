"use client";

import { SyntheticEvent, useRef, useState } from "react";
import styles from "./page.module.css";
import generateNumber from "@/utils/generateNumber";

export default function Page() {
  const inputRef = useRef<null | HTMLInputElement>(null);

  const [activeGame, setActiveGame] = useState<boolean | null>(false);
  const [savedNumber, setSavedNumber] = useState<number | null>(null);
  const [text, setText] = useState<string>("Жду ввода");

  const [guessNumber, setGuessNumber] = useState(generateNumber);

  const restartGame = () => {
    setGuessNumber(generateNumber());
    setSavedNumber(null);
    setText("Жду ввода");
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const number = Number(inputRef.current?.value);

    setSavedNumber(number);

    if (number! < guessNumber) {
      setText("Ваше число меньше загаданного");
    } else if (number! > guessNumber) {
      setText("Ваше число больше загаданного");
    } else {
      setText("Ура, вы угадали!");
    }

    inputRef.current!.value = "";
  };

  return (
    <section className={styles.main_section}>
      <h1>Вам необходимо угадать число от 1 до 100</h1>
      {activeGame ? <></> : <h2>Нажмите ниже чтобы начать</h2>}

      {activeGame ? (
        <div className={styles.input_container}>
          <p title="типо ждун)))))))">{text}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="number"
              min={1}
              max={100}
              ref={inputRef}
              name="input"
            />

            <button className={styles.submit_button} type="submit">
              Ввод
            </button>
          </form>
          <button onClick={() => setActiveGame(false)}>назад</button>
          <button onClick={() => restartGame()}>Занаво</button>
        </div>
      ) : (
        <>
          <button onClick={() => setActiveGame(true)}>Нажми на меня!</button>
        </>
      )}

      <p>загаданное число {guessNumber}</p>
      <p>сохраненное число {savedNumber}</p>
    </section>
  );
}
