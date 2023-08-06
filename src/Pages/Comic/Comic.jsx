import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./comic.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
export default function Comic(props) {
  const { id } = useParams();
  const [comic, setComic] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [isFavorite, setIseFavorit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${props.server}/comic/${id}`);
      const favorites = await axios.get(`${props.server}/favorites`, {
        headers: { authorization: `Bearer ${props.token}` },
      });

      if (
        favorites.data.comics.find((comic) => comic._id === response.data._id)
      ) {
        setIseFavorit(true);
      }

      setComic(response.data);
      setIsReady(true);
    })();
  }, [isFavorite]);
  const handleLikeOnClick = async () => {
    if (props.token) {
      const response = await axios.put(
        `${props.server}/favoritesManage`,
        {
          token: props.token,
          comic: id,
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
    <main className="comic-page">
      <div className="wrapper">
        <h2>
          <span>{comic.title}</span>
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
              src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
              alt={`couverture de ${comic.title}`}
              title={`couverture de ${comic.title}`}
            />
          </div>
          <p>{comic.description}</p>
        </div>
      </div>
    </main>
  );
}
