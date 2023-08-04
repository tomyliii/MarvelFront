import "./favorites.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "../../Components/ComicCard/ComicCard";
import CharacterCard from "../../Components/CharacterCard/CharacterCard";
export default function Favorites(props) {
  const [comics, setComics] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.server}/favorites`, {
          headers: { Authorization: `Bearer ${props.token}` },
        });
        console.log(response);
        setComics(response.data.comics);
        setCharacters(response.data.characters);

        console.log(response);
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
      <main>
        <h2>Tes favoris</h2>

        <section>
          <h3>Les Super-Héros</h3>
          <div>
            {characters.length !== 0 ? (
              characters.map((character) => {
                <CharacterCard character={character} />;
              })
            ) : (
              <p>Tu n'as aucun favoris danc cette catégorie</p>
            )}
          </div>
        </section>
        <section>
          <h3>Les Comics</h3>
          <div>
            {comics.length !== 0 ? (
              comics.map((comic) => {
                <ComicCard comic={comic} />;
              })
            ) : (
              <p>Tu n'as aucun favoris danc cette catégorie</p>
            )}
          </div>
        </section>
      </main>
    )
  ) : (
    <div>LAAAAAAA</div>
  );
}
