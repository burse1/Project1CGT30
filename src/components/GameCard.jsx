export default function GameCard({ title, meta, image }) {
  console.log("GameCard image:", image);
    return (
    <article className="gameCard" aria-label={title}>
      <div className="thumb">
  <img src={image} alt={title} className="gameImg" />
</div>
      <div className="cardText">
        <div className="cardTitle">{title}</div>
        <div className="cardMeta">{meta}</div>
      </div>
    </article>
  );
}
