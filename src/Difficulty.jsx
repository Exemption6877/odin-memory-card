export default function Difficulty({ difficulty, direction }) {
  return (
    <div className="difficulty container">
      <div className={`button-wrapper ${direction}`}>
        <button onClick={() => difficulty(6)}>Easy</button>
        <button onClick={() => difficulty(8)}>Medium</button>
        <button onClick={() => difficulty(10)}>Hard</button>
      </div>
    </div>
  );
}
