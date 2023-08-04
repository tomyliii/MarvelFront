import { useParams } from "react-router-dom";
import "./comic.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Comic(props) {
  const { id } = useParams();
  const [comic, setComic] = useState({});
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${props.server}/comic/${id}`);
      console.log(response);
      setComic(response.data);
      setIsReady(true);
    })();
  }, []);
  return !isReady ? (
    <div>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <main>
      <h2>{comic.title}</h2>
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
    </main>
  );
}
