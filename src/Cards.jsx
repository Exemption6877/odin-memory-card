export default function Cards({ items, click }) {
  return (
    <div className="card-table">
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
  );
}
