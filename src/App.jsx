import Cards from "./Cards";
import Difficulty from "./Difficulty";
import Loading from "./Loader";
import { useEffect } from "react";
import { useState } from "react";
import "./Cards.css";
import "./App.css";
import "./reset.css";

export default function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [entries, setEntries] = useState([]);
  const [score, setScore] = useState({ score: 0, maxScore: 0 });
  const [isLoading, setIsLoading] = useState(false);

  function updateDifficulty(num) {
    setDifficulty(num);
  }

  function randomizer(max) {
    return Math.floor(Math.random() * max);
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

      {isLoading ? <Loading /> : <Cards items={entries} />}
    </>
  );
}
