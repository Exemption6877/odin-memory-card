export default function Cards({ items, click, columns }) {
  return (
    <div className="game-area">
      <h2>Pick a different creature every time.</h2>
      <div className={`card-table ${columns}`}>
        {items.map((item) => {
          return (
            <button
              key={item.id}
              className="card"
              value={item.id}
              onClick={click}
            >
              <img src={item.sprite} alt={item.name} />
              <p>{item.name.at(0).toUpperCase() + item.name.slice(1)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
