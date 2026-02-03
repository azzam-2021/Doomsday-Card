import "./Item.css";
function Item({ character }) {
  return (
    <div className="char-card">
      <img src={character.img} alt={character.name} />
      <div className="char-content">
        <h2>{character.name}</h2>
        <span className="alias">Alias: {character.alias}</span>
        <span className="role">Role: {character.role}</span>
        <span className="actor">Portrayed by: {character.actor}</span>
      </div>
      <div className="char-description">
        <h3>Description</h3>
        <p>{character.description}</p>
      </div>
    </div>
  );
}

export default Item;