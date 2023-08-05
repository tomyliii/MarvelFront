import { useEffect, useState } from "react";
import "./personnages.css";
import axios from "axios";
import CharacterCard from "../../Components/CharacterCard/CharacterCard";
import PagesCalculator from "../../assets/Tools/pagesCalculator";
import Pagination from "../../Components/Pagination/Pagination";

export default function Personnages(props) {
  const [characteres, setCharacters] = useState([]);
  const [isReady, setIsReady] = useState("false");
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(100);

  try {
    useEffect(() => {
      (async () => {
        const response = await axios.get(
          `${props.server}/characters?limit=${limit}&page=${selectedPage}`
        );
        console.log(response);
        setCharacters(response.data.results);
        PagesCalculator(response.data.count, limit, setPages);
        setIsReady(true);
      })();
    }, [selectedPage]);
  } catch (error) {
    console.log(error);
  }

  return !isReady ? (
    <div>Loading, please wait...</div>
  ) : (
    <main className="personnages-page">
      <div className="wrapper ">
        <h2>Personnages Marvel</h2>
        <section>
          {characteres.map((character) => {
            return <CharacterCard key={character._id} character={character} />;
          })}
        </section>
        <Pagination
          selectedPage={selectedPage}
          pages={pages}
          setSelectedPage={setSelectedPage}
        />
        <div className="image-back"></div>
      </div>
    </main>
  );
}
