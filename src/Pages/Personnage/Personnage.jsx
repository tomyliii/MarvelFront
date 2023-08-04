import { useParams } from "react-router-dom";
import "./personnage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "../../Components/ComicCard/ComicCard";

export default function Personnage(props) {
  const [character, setCharacter] = useState({});
  const [comics, setComics] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.server}/character/${id}`);
        console.log(response);
        setCharacter(response.data.character);
        setComics(response.data.comics.comics);
        setIsReady(true);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(character);
  console.log(comics);
  return !isReady ? (
    <div>
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <main>
      <section>
        <h2>{character.name}</h2>
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
      <section>
        {comics.map((comic) => {
          return <ComicCard comic={comic} key={comic._id} />;
        })}
      </section>
    </main>
  );
}
