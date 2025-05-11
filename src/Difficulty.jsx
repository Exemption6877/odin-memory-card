export default function Difficulty({ difficulty }) {
  return (
    <>
      <h1>Select Difficulty</h1>
      <button onClick={() => difficulty(6)}>Easy</button>
      <button onClick={() => difficulty(8)}>Medium</button>
      <button onClick={() => difficulty(10)}>Hard</button>
    </>
  );
}
