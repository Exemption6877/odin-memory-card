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
    setGameScore({ score: 0, maxScore: 0 });
  }

  function randomizer(max) {
    return Math.floor(Math.random() * max);
  }

  function shuffle(entries) {
    const prevEntries = [...entries];
    const output = [];

    while (prevEntries.length > 0) {
      let randomIndex = randomizer(prevEntries.length);
      let randomItem = prevEntries[randomIndex];
      output.push(randomItem);
      prevEntries.splice(randomIndex, 1);
    }

    return output;
  }

  function buttonLogic(e) {
    const buttonValue = Number(e.currentTarget.value);
    const entry = entries.find((entry) => entry.id === buttonValue);
    const shuffledEntries = shuffle(entries);

    if (entry.clicked === true) {
      setGameScore({ score: 0, maxScore: gameScore.maxScore });
      setEntries(shuffledEntries.map((item) => ({ ...item, clicked: false })));
    } else {
      setEntries(
        shuffledEntries.map((item) =>
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
    <div className="app-area">
      <Difficulty
        difficulty={updateDifficulty}
        direction={difficulty ? "column" : "row"}
      />

      {isLoading ? (
        <Loading />
      ) : difficulty ? (
        <div className="main-content">
          <Score item={gameScore} />
          <Cards
            items={entries}
            click={buttonLogic}
            columns={`rows-${difficulty}`}
          />
        </div>
      ) : null}
    </div>
  );
}
