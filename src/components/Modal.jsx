export default function Modal({
  title,
  image,
  scoreText,
  buttonText,
  onClick,
}) {
  return (
    <>
      <section className="modal-container">
        <p className="modal-title">{title}</p>
        <img className="modal-img" src={image} alt="Endscreen image" />
        <p className="modal-score">{scoreText}</p>
        <button className="modal-btn" type="button" onClick={onClick}>
          {buttonText}
        </button>
      </section>
      <div className="modal-overlay"></div>
    </>
  );
}
