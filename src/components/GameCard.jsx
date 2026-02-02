export default function GameCard({ title, meta }) {
  return (
    <article className="gameCard" aria-label={title}>
      <div className="thumb" />
      <div className="cardText">
        <div className="cardTitle">{title}</div>
        <div className="cardMeta">{meta}</div>
      </div>
    </article>
  );
}
