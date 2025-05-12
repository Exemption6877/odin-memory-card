export default function Score({ item }) {
  return (
    <div className="score">
      <p>Score: {item.score}</p>
      <p>Max Score: {item.maxScore}</p>
    </div>
  );
}
