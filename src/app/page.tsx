"use client";

import { SyntheticEvent, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const inputRef = useRef<null | HTMLInputElement>(null);

  const [activeGame, setActiveGame] = useState<boolean | null>(false);
  const [savedNumber, setSavedNumber] = useState<number | null>();
  const [text, setText] = useState<string>("Жду ввода");

  let guessNumber = Math.floor(Math.random() * 100) + 1;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setSavedNumber(Number(inputRef.current?.value));

    if (savedNumber! < guessNumber) {
      setText("Ваше число меньше загаданного");
    }
    if (savedNumber! > guessNumber) {
      setText("Ваше число больше загаданного");
    }
    if (savedNumber! === guessNumber) {
      setText("Ура, вы угадали!");
    }
  };

  return (
    <section className={styles.section}>
      <h1>Вам необходимо угадать число от 1 до 100</h1>
      <h2>Нажмите ниже чтобы начать</h2>

      <p>загаданное число {guessNumber}</p>
      <p>сохраненное число {savedNumber}</p>

      {activeGame ? (
        <div>
          <p title="типо ждун)))))))">{text}</p>

          <form onSubmit={handleSubmit}>
            <input type="number" min={1} max={100} ref={inputRef} />

            <button type="submit">sdcsdc</button>
          </form>
          <button onClick={() => setActiveGame(false)}>назад</button>
        </div>
      ) : (
        <button onClick={() => setActiveGame(true)}>Нажми на меня!</button>
      )}
    </section>
  );
}
