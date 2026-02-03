import { useState } from "react";

import CharacterJson from "../../Data/Doomsday.json";
import Item from "../Item/Item";

import "./List.css";

function Characters() {
  const [character] = useState(CharacterJson);
  const [filterCharacter, setFilterCharacter] = useState(CharacterJson);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    const search = character.filter((item) =>
      item.name.toLowerCase().includes(value)
    );

    setFilterCharacter(search);
  };

  return (
    <div className="char-page">
      <input
        type="text"
        placeholder="Search the Doomsday character you wan't"
        className="search"
        onChange={handleSearch}
      />

      <div className="list-char">
        {filterCharacter.length === 0 ? (
          <p className="not-found">Data tidak ditemukan</p>
        ) : (
          filterCharacter.map((item) => (
            <Item key={item.id} character={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default Characters;