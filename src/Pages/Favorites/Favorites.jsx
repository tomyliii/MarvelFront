import "./favorites.css";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ComicCard from "../../Components/ComicCard/ComicCard";
import CharacterCard from "../../Components/CharacterCard/CharacterCard";
export default function Favorites(props) {
  const [comics, setComics] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [characters, setCharacters] = useState([]);
  const location = useLocation();
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.server}/favorites`, {
          headers: { Authorization: `Bearer ${props.token}` },
        });
        console.log(response);
        setComics(response.data.comics);
        setCharacters(response.data.characters);

        console.log("la reponse", response);
        setIsReady(true);
      })();
    } catch (error) {
      console.log("respo,nse error", error);
    }
  }, []);
  console.log(characters, "ici", comics);
  return props.token ? (
    !isReady ? (
      <div>
        <p>Loading, please wait...</p>
      </div>
    ) : (
      <main className="favorites-page">
        <div className="wrapper">
          <h2>Tes favoris</h2>

          <section>
            <h3>Les Super-Héros</h3>
            <div className="favorites-heros">
              {characters.length !== 0 ? (
                characters.map((character) => {
                  return <CharacterCard character={character} />;
                })
              ) : (
                <p>Tu n'as aucun favoris danc cette catégorie</p>
              )}
            </div>
          </section>
          <section>
            <h3>Les Comics</h3>
            <div className="favorites-comics">
              {comics.length !== 0 ? (
                comics.map((comic) => {
                  return <ComicCard comic={comic} />;
                })
              ) : (
                <p>Tu n'as aucun favoris danc cette catégorie</p>
              )}
            </div>
          </section>
        </div>
      </main>
    )
  ) : (
    <Navigate to={"/login"} state={{ path: location.pathname }}>
      LAAAAAAA
    </Navigate>
  );
}
