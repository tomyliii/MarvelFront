import { Link } from "react-router-dom";
import "./comicCard.css";

export default function ComicCard({ comic }) {
  return (
    <Link to={`/comic/${comic._id}`}>
      <h3>{comic.title}</h3>
      <img
        src={`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`}
        alt={`couverture de ${comic.title} `}
        title={`couverture de ${comic.title} `}
      />
    </Link>
  );
}
