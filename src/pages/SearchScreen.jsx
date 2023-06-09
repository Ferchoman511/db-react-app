import React, { useState, useEffect } from "react";

import queryString from "query-string";
import { Characters } from "../models/Characters";
import Card from "../components/Card";
import { useLocation } from "react-router";
// import { useLocation } from "react-router";

const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  const [inputValue, setInputValue] = useState(q);
  const [characters, setCharacters] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const handleSubmit = (e) => {
    history.push(`?q=${inputValue}`);
    e.preventDefault();
  };

  const getCharacter = () => {
    if (inputValue.trim() !== "") {
      const value = inputValue.toLocaleLowerCase();
      const newValue = Characters.filter((char) =>
        char.name.toLocaleLowerCase().includes(value)
      );
      setCharacters(newValue);
      console.log(characters);
    } else {
      setCharacters([]);
    }
  };
  // useEffect(() => {
  //   getCharacter();
  // }, [q]);
  useEffect(() => {
    getCharacter();
  }, [q]);

  return (
    <div className="container">
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-6">
          <h2>Search</h2>
          <form onSubmit={handleSubmit}>
            <label className="form-label w-100">
              Character:{" "}
              <input
                placeholder="Caracter a buscar"
                type="text"
                className="form-control"
                autoComplete="off"
                value={inputValue}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn btn-info w-100">
              Search
            </button>
          </form>
        </div>
        <div className="col-6">
          <h2>Results : {characters.length}</h2>
          {characters.length === 0 && (
            <div className="alert alert-warning text-center">
              Datos no encontrados. Por favor introduzca nuevos caracteres
            </div>
          )}
          {characters.map((char) => (
            <Card key={char.id} {...char} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
