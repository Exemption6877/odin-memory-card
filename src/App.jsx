import Cards from "./Cards";
import "./Card.css";
import "./App.css";
import "./reset.css";
import Difficulty from "./Difficulty";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [entries, setEntries] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function updateDifficulty(num) {
    setDifficulty(num);
  }

  function randomizer(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    if (difficulty === null) return;

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
    };

    getPokemon();
  }, [difficulty]);

  return (
    <>
      {!difficulty ? <Difficulty difficulty={updateDifficulty} /> : null}
      <Cards items={entries} />
    </>
  );
}
