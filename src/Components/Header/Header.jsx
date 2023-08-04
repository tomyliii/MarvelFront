import "./header.css";
import Logo from "../../assets/Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Header(props) {
  const [search, setSearch] = useState("");
  console.log(props.token);
  return (
    <header>
      <div>
        <section>
          <img src={Logo} alt="Logo MArvel" />
        </section>
        <section>
          {props.token ? (
            <button
              onClick={() => {
                Cookies.remove("userToken");
                props.setToken("");
                Cookies.remove("nickname");
                props.setNickname("");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <Link to={"/login"}>Se connecter||S'inscrir</Link>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              placeholder="Recherche ton héro"
            />
          </form>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Personnages</Link>
              </li>
              <li>
                <Link to={"/comics"}>Comics</Link>
              </li>
              <li>
                <Link to={"/favorites"}>
                  <FontAwesomeIcon icon={faHeart} /> Favoris
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </header>
  );
}
