import Cards from "./Cards";
import Difficulty from "./Difficulty";
import Loading from "./Loader";
import Score from "./Score";
import { useEffect } from "react";
import { useState } from "react";
import "./Cards.css";
import "./App.css";
import "./reset.css";

export default function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameScore, setGameScore] = useState({ score: 0, maxScore: 0 });

  function updateDifficulty(num) {
    setDifficulty(num);
  }

  function randomizer(max) {
    return Math.floor(Math.random() * max);
  }

  function buttonLogic(e) {
    const buttonValue = Number(e.currentTarget.value);

    const entry = entries.find((entry) => entry.id === buttonValue);

    if (entry.clicked === true) {
      setGameScore({ score: 0, maxScore: gameScore.score });

      setEntries(entries.map((item) => ({ ...item, clicked: false })));
    } else {
      setEntries(
        entries.map((item) =>
          item.id === entry.id ? { ...item, clicked: true } : item
        )
      );
      setGameScore((prevScore) => {
        const newValue = prevScore.score + 1;

        return {
          score: newValue,
          maxScore:
            newValue > prevScore.maxScore ? newValue : prevScore.maxScore,
        };
      });
    }
  }

  useEffect(() => {
    if (difficulty === null) return;

    setIsLoading(true);
    const uniqueId = [];
    while (uniqueId.length !== difficulty) {
      const randomNumber = randomizer(150);
      if (!uniqueId.includes(randomNumber)) {
        uniqueId.push(randomNumber);
      }
    }

    const getPokemon = async () => {
      const newEntries = [];
      for (let number of uniqueId) {
        try {
          const result = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${number}/`
          );
          const response = await result.json();

          newEntries.push({
            id: response.id,
            name: response.name,
            sprite: response.sprites.front_default,
            clicked: false,
          });
        } catch (err) {
          console.error("Failed API fetch : ", err);
        }
      }
      setEntries(newEntries);
      setIsLoading(false);
    };

    getPokemon();
  }, [difficulty]);

  return (
    <>
      {!difficulty ? <Difficulty difficulty={updateDifficulty} /> : null}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Score item={gameScore} />
          <Cards items={entries} click={buttonLogic} />
        </>
      )}
    </>
  );
}
