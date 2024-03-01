export default function Header({ clickFunction }) {
  return (
    <>
      <div id="title-container">
        <img
          id="logo"
          src="logo.png"
          alt="Pokémon logo"
          onClick={clickFunction}
        />
        <h1 id="title" onClick={clickFunction}>
          Memory Card Game
        </h1>
      </div>
      <div id="rule-container">
        <p>Don't click on the same pokemon twice!</p>
      </div>
    </>
  );
}
