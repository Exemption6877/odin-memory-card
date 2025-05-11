import Card from "./Card";
import "./Card.css";
import "./App.css";
import "./reset.css";
import Difficulty from "./Difficulty";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const MAX_ENTRIES = 10;
  const [difficulty, setDifficulty] = useState(null);
  const [entries, setEntries] = useState([]);
  const [counter, setCounter] = useState(0);

  function updateDifficulty(num) {
    setDifficulty(num);
    console.log(num);
  }

  function randomizer(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const uniqueId = [];
    while (uniqueId.length !== 10) {
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
          newEntries.push(response.sprites.front_default);
        } catch (err) {
          console.error("Failed API fetch : ", err);
        }
      }
      setEntries(newEntries);
    };

    getPokemon();
  }, []);

  return (
    <>
      <div className="title-area">
        {!difficulty ? <Difficulty difficulty={updateDifficulty} /> : null}
      </div>

      <div className="card-table">
        <Card src={entries ? entries[0] : ""} />
        <Card src={entries ? entries[1] : ""} />
        <Card src={entries ? entries[2] : ""} />
        <Card src={entries ? entries[3] : ""} />
      </div>
    </>
  );
}
