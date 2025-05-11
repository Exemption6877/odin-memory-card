export default function Card({ src }) {
  const fallback = "./no_image.svg";
  // do alt with api name
  return (
    <button className="card">
      <img src={src} alt="" />
      <p>Pokemon Name</p>
    </button>
  );
}
