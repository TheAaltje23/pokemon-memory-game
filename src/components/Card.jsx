export default function Card({ pokemon, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img className="card-img" src={pokemon.image} alt={pokemon.name} />
      <span className="card-span">{pokemon.name}</span>
    </div>
  );
}
