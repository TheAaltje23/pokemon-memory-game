import { useState } from "react";
import Header from "./Header";
import GameScreen from "./GameScreen";

export default function StartScreen() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [difficulty, setDifficulty] = useState(0);

  const difficultyList = {
    easy: 6,
    medium: 12,
    hard: 24,
    insane: 60,
  };

  const handleDifficulty = (amount) => {
    setDifficulty(amount);
    setShowStartScreen(false);
  };

  return (
    <>
      {showStartScreen ? (
        <>
          <Header />
          <div id="difficulty-title-container">
            <h1>Choose your difficulty...</h1>
          </div>
          <div id="difficulty-btn-container">
            {Object.keys(difficultyList).map((key) => (
              <button
                key={key}
                id={key}
                className="difficulty-btn"
                type="button"
                onClick={() => handleDifficulty(difficultyList[key])}
              >
                {key + " [" + difficultyList[key] + "]"}
              </button>
            ))}
          </div>
        </>
      ) : (
        <GameScreen difficulty={difficulty} />
      )}
    </>
  );
}
