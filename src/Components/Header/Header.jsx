import "./header.css";
import Logo from "../../assets/Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleOnBlur = (event) => {
    navigate("/", { state: { name: search } });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    navigate("/", { state: { name: search } });
  };
  return (
    <header>
      <div className="wrapper">
        <section className="logo-section">
          <img src={Logo} alt="Logo MArvel" />
        </section>
        <section>
          <div className="button-container">
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
              <Link to={"/login"}>Se connecter | S'inscrir</Link>
            )}
          </div>
          <form
            onSubmit={(event) => {
              handleOnSubmit(event);
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              onBlur={(event) => {
                handleOnBlur(event);
              }}
              onSubmit={(event) => {
                handleOnSubmit(event);
              }}
              placeholder="Recherche ton héro"
            />
            <input type="submit" value="valider" className="hidden" />
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
