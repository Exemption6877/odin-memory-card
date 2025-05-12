export default function Score({ item }) {
  return (
    <>
      <p>
        Score: {item.score}. Max Score: {item.maxScore}
      </p>
    </>
  );
}
