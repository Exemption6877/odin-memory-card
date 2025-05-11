export default function Card({ src, name }) {
  return (
    <button className="card">
      <img src={src} alt={name} />
      <p>{name.at(0).toUpperCase() + name.slice(1)}</p>
    </button>
  );
}
