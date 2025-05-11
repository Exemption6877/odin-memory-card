import Card from "./Card";
import "./Card.css";
import "./App.css";
import "./reset.css";
import Difficulty from "./Difficulty";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [images, setImages] = useState(null);
  const [counter, setCounter] = useState(0);

  function updateDifficulty(num) {
    setDifficulty(num);
    console.log(num);
  }

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/1/`);
        const response = await result.json();
        setImages(response.sprites.front_default);
      } catch (err) {
        console.error("Failed API fetch : ", err);
      }
    };

    getPokemon();
  }, []);

  return (
    <>
      <div className="title-area">
        {!difficulty ? <Difficulty difficulty={updateDifficulty} /> : null}
      </div>

      <div className="card-table">
        <Card src={images ? images : ""} />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}
