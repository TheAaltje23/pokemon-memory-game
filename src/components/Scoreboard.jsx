export default function Scoreboard({ score, highscore }) {
  return (
    <div id="score-container">
      <span id="score">Score: {score}</span>
      <span id="highscore">Highscore: {highscore}</span>
    </div>
  );
}
