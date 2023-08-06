import ComicCard from "../../Components/ComicCard/ComicCard";
import { useState, useEffect } from "react";
import axios from "axios";
import "./comics.css";
import PagesCalculator from "../../assets/Tools/pagesCalculator";
import Pagination from "../../Components/Pagination/Pagination";
export default function Comics(props) {
  const [comics, setComics] = useState([]);
  const [isReady, setIsReady] = useState("false");
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(100);

  try {
    useEffect(() => {
      (async () => {
        const response = await axios.get(
          `${props.server}/comics?limit=${limit}&page=${selectedPage}`
        );
        console.log(response);
        setComics(response.data.results);
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
    <main className="comics-page">
      <div className="wrapper">
        <h2>Comics</h2>
        <section>
          {comics.map((comic) => {
            return <ComicCard key={comic._id} comic={comic} />;
          })}
        </section>
        <Pagination
          pages={pages}
          setSelectedPage={setSelectedPage}
          selectedPage={selectedPage}
        />
      </div>
    </main>
  );
}
