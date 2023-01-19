import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Pokemon() {
  let x = 1;
  const [pokemon, setPokemon] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [moveList, setMoveList] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  function GetMoves(urlPrompt: any) {
    //lists all moves, need to run a map .......................................
    fetch(`${urlPrompt}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json, "test");
        return json;
      });
  }
  function capitalizeFirstLetter(string: string) {   
    let ReturnMe = (string.charAt(0).toUpperCase() + string.slice(1))
    return (ReturnMe);
  }

  useEffect(() => {
    if (!router.isReady) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setIsloading(false);
        setPokemon(json);
        console.log(pokemon);

      });
  }, [router.isReady]);

  return (
    <>
      {pokemon == null ? (
        <p>Blanks</p>
      ) : (
        <div className="card mx-auto card-shadow" >
          <img
            className="card-img-top"
            style={{/* width: */}}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">Name: {capitalizeFirstLetter(pokemon["name"])}</h5>
            <h5>Species: {capitalizeFirstLetter(pokemon["species"]["name"])}</h5>
            <h5 className="card-title">Weight: {pokemon["weight"]}</h5>
            <h5>Base Experience: {pokemon["base_experience"]}</h5>
            <h5>Base HP: {pokemon["stats"]["0"]["base_stat"]}</h5>
            <h5>Base Attack: {pokemon["stats"]["1"]["base_stat"]}</h5>
            <h5>Base Defense: {pokemon["stats"]["2"]["base_stat"]}</h5>
            <Link href="/" className="btn btn-primary">
              Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
