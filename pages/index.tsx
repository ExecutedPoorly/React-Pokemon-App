import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { KeyObject } from "crypto";
export function Paragraph(props: any) {
  return (
    <>
      <p>
        {props.id}:{props.title}
      </p>
    </>
  );
}

export function Cards(props: any) {
  const [show, setShow] = useState(1);
  const [likes, setLikes] = useState(0); //test

  // likes = const variable, setLikes is a function that updates.
  // ex = setLikes(likes+1);
  const [LikeButton, LikeClicked] = useState(0);
  // when show is changed, makes you hit show for each card
  if (show == 0) {
    return (
      <div className="card col-4 d-flex justify-content-center">
        <button
          onClick={() => {
            setShow(show + 1);
          }}
          className="btn btn-primary"
        >
          Show card
        </button>
      </div>
    );
  } else {
    return (
      <div className="card col-4 d-flex justify-content-center">
        <img
          src={props.src}
          className="card-img-top"
          //style={{ width: "${likes}px" }} //CHECK THIS--------!!!!!!!!!!! ${likes}

          alt="..."
        />
        <div className="card-body">
          <Link href={{ pathname: "pokemons/[id]", query: { id: props.id } }}>
            <h5 className="card-title">{props.title}</h5>
          </Link>
          <p className="card-text">{props.text}</p>
          {likes == 0 ? null : <p className="card-text">Likes: {likes}</p>}
          {LikeButton != 0 ? null : (
            <button
              onClick={() => {
                setLikes(likes + 1);
                LikeClicked(LikeButton + 1);
              }}
              className="btn btn-primary"
            >
              {props.buttonText}
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default function App() {
  function getIDFromPokemon(pokemon :any) {
    pokemon = pokemon.url
      .replace("https://pokeapi.co/api/v2/pokemon/", "")
      .replace("/", "");
    //let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return pokemon;
  }
  // fetch pokemon json list below, convert to json
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [pokemonList, setPokemonList] = useState<any[]>([]); //we have passed an "any" type to the hook. This solves the error since now TypeScript expects the array to have any kind of value.
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?=offset=${offset}&limit=${limit}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setIsLoading(false);
        //setPokemonList(pokemonList.push(json["results"]);
        setPokemonList([...pokemonList, ...json["results"]]);
      });
  }, [offset]);
  // second param [] blocks running again, will trigger each time variable changes.
  console.log(pokemonList);
  console.log("nio");
  return (
    <>
    <div className="App">
      <div className="container">
        <div className="row">
          {pokemonList.map((pokemon) => {
            //For each pokemon in list, create a card. Each pokemon has "name" entry.
            const id = getIDFromPokemon(pokemon);
            return(
              <>
              <Cards
                key={id}
                buttonText="Like"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                id={id}
                title={pokemon["name"]}
                text=""
              />
              </>
            );
          })}
        </div>
        <div className="col">
          {isLoading == true ? (
            <div className="spinner-border text-primary row " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : null}

          <div>
            <button
              onClick={() => {
                setOffset(offset + limit);
              }}
            >
              More
            </button>

            <Link href="/test">TEST</Link>
          </div>
        </div>
      </div>
    </div>
    </>);
}
