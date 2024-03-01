import { useEffect, useState } from "react";
import { shuffle } from "../utils/shuffle";
import StartScreen from "./StartScreen";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Scoreboard from "./Scoreboard";
import Card from "./Card";
import Modal from "./Modal";

export default function GameScreen({ difficulty }) {
  const MAX_POKEMON_ID = 1025;

  // STATES
  const [pokemonList, setPokemonList] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [toStart, setToStart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  // FETCH DATA
  useEffect(() => {
    fetchPokemon();
  }, []);

  // FETCH LOGIC
  const fetchPokemon = async () => {
    try {
      setLoading(true);

      // Gather all promises into an array + gather only unqiue pokemon
      const promises = [];
      const uniquePokemon = [];

      for (let i = 0; i < difficulty; i++) {
        let randomPokemon;
        do {
          randomPokemon = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
        } while (uniquePokemon.includes(randomPokemon));

        uniquePokemon.push(randomPokemon);

        const pokemonApi = `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`;
        const response = await fetch(pokemonApi);
        promises.push(response.json());
      }

      // Returns single promise when all the promises are resolved
      const data = await Promise.all(promises);

      const pokemonData = data.map((pokemon, index) => ({
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        key: `${pokemon.name}-${index}`,
      }));

      setPokemonList(pokemonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setLoading(false);
    }
  };

  const handleCardClick = (key) => {
    // Copy existing pokemonList and shuffle it
    const shuffledList = [...pokemonList];
    shuffle(shuffledList);
    setPokemonList(shuffledList);

    // Win and lose conditions
    if (trackList.includes(key)) {
      setGameOver(true);
    } else {
      setTrackList((prevList) => [...prevList, key]);
      setScore((prevScore) => prevScore + 1);
      setHighscore((prevscore) =>
        score + 1 >= prevscore ? score + 1 : prevscore
      );
      if (score === difficulty - 1) {
        setGameWin(true);
      }
    }
  };

  const handleStart = () => {
    setToStart(true);
  };

  const handleGameOverClick = () => {
    setScore(0);
    setTrackList([]);
    setGameWin(false);
    setGameOver(false);
    fetchPokemon();
  };

  const handleWinClick = () => {
    setScore(0);
    setHighscore(0);
    setTrackList([]);
    setGameWin(false);
    setGameOver(false);
    fetchPokemon();
  };

  return (
    <>
      {toStart ? (
        <StartScreen />
      ) : loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header clickFunction={handleStart} />
          <Scoreboard score={score} highscore={highscore} />
          <div id="card-container">
            {pokemonList.map((pokemon) => {
              return (
                <Card
                  key={pokemon.key}
                  pokemon={pokemon}
                  onClick={() => handleCardClick(pokemon.name)}
                />
              );
            })}
            {gameOver && (
              <Modal
                title={"Game Over!"}
                image={
                  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWNqZGJlejRrdXZlb21sYzZybDR4dTYwendjdnJlb2ZzN3Y2b254dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uRROb0WYxnPoc/giphy.gif"
                }
                scoreText={`Your score: ${score}`}
                buttonText={"Play Again!"}
                onClick={handleGameOverClick}
              />
            )}
            {gameWin && (
              <Modal
                title={"You Win!"}
                image={
                  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHRtNDNvM3RpeWNpenA2Nng4OW9zZnVhN3ZuZTZ1emhiaXRuMmpmNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ardUtH5FlenO8/giphy.gif"
                }
                scoreText={`Your score: ${score}`}
                buttonText={"Play Again!"}
                onClick={handleWinClick}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
