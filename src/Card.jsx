export default function Card(link) {
  const fallback = "./no_image.svg";
  // do alt with api name
  return (
    <button className="card">
      <img src={fallback} alt="" />
    </button>
  );
}
