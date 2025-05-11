export default function Cards({ items }) {
  return (
    <div className="card-table">
      {items.map((item) => {
        return (
          <button key={item.id} className="card">
            <img src={item.sprite} name={item.name} />
            <p>{item.name.at(0).toUpperCase() + item.name.slice(1)}</p>
          </button>
        );
      })}
    </div>
  );
}
