import { Link } from "react-router-dom";
import "./characterCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function CharacterCard({ character }) {
  return (
    <Link to={`/personnage/${character._id}`}>
      <h3>{character.name}</h3>
      <img
        src={
          character.thumbnail.path +
          "/standard_xlarge." +
          character.thumbnail.extension
        }
        alt={`image de ${character.name}`}
        title={`image de ${character.name}`}
      />
    </Link>
  );
}
