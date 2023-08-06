import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./personnage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "../../Components/ComicCard/ComicCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
export default function Personnage(props) {
  const [character, setCharacter] = useState({});
  const [comics, setComics] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isFavorite, setIseFavorit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.server}/character/${id}`);
        const favorites = await axios.get(`${props.server}/favorites`, {
          headers: { authorization: `Bearer ${props.token}` },
        });

        if (
          favorites.data.characters.find(
            (character) => character._id === response.data.character._id
          )
        ) {
          setIseFavorit(true);
        }
        setCharacter(response.data.character);
        setComics(response.data.comics.comics);
        setIsReady(true);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [isFavorite]);
  const handleLikeOnClick = async () => {
    if (props.token) {
      const response = await axios.put(
        `${props.server}/favoritesManage`,
        {
          token: props.token,
          character: id,
        },
        {
          headers: { authorization: `Bearer ${props.token}` },
        }
      );
      setIseFavorit(!isFavorite);
    } else {
      navigate("/login", { state: { path: location.pathname } });
    }
  };

  return !isReady ? (
    <div>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <main className="character-page">
      <div className="wrapper">
        <section className="character-section">
          <h2>
            <span>{character.name}</span>
            <span
              onClick={handleLikeOnClick}
              className={isFavorite ? "like" : ""}
            >
              <FontAwesomeIcon icon={faHeart} />
            </span>
          </h2>
          <div>
            <div>
              <img
                src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                alt={`image de ${character.name}`}
                title={`image de ${character.name}`}
              />
            </div>
            <p>{character.description}</p>
          </div>
        </section>
        <section className="character-comics">
          <h3>Vu dans :</h3>

          <div>
            {comics.map((comic) => {
              return <ComicCard comic={comic} key={comic._id} />;
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
