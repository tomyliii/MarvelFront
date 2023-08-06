import "./header.css";
import Logo from "../../assets/Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuSmallScreen, setMenuSmallScreen] = useState(false);

  useEffect(() => {
    if (menuSmallScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuSmallScreen]);

  const handleOnBlur = (event) => {
    navigate("/", { state: { name: search } });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    navigate("/", { state: { name: search } });
  };
  const handleOnClick = (event) => {
    setMenuSmallScreen(!menuSmallScreen);
  };
  console.log(menuSmallScreen);
  return (
    <header>
      <div className="wrapper">
        <section className="logo-section">
          <img src={Logo} alt="Logo MArvel" />
        </section>
        <section className={`menu-nav-large-sreen`}>
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
        <button
          className="little-screen-button-menu"
          onClick={(event) => {
            setMenuSmallScreen(!menuSmallScreen);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {menuSmallScreen && (
        <section className="little-screen-menu">
          <button
            className="little-screen-button-menu"
            onClick={(event) => {
              setMenuSmallScreen(!menuSmallScreen);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="button-container">
            {props.token ? (
              <button
                onClick={() => {
                  Cookies.remove("userToken");
                  props.setToken("");
                  Cookies.remove("nickname");
                  props.setNickname("");
                  setMenuSmallScreen(!menuSmallScreen);
                }}
              >
                Se déconnecter
              </button>
            ) : (
              <Link
                to={"/login"}
                onClick={(event) => {
                  setMenuSmallScreen(!menuSmallScreen);
                }}
              >
                Se connecter | S'inscrir
              </Link>
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
            <input
              type="submit"
              value="valider"
              onClick={(event) => {
                setMenuSmallScreen(!menuSmallScreen);
              }}
            />
          </form>
          <nav>
            <ul>
              <li>
                <Link
                  to={"/"}
                  onClick={(event) => {
                    setMenuSmallScreen(!menuSmallScreen);
                  }}
                >
                  Personnages
                </Link>
              </li>
              <li>
                <Link
                  to={"/comics"}
                  onClick={(event) => {
                    setMenuSmallScreen(!menuSmallScreen);
                  }}
                >
                  Comics
                </Link>
              </li>
              <li>
                <Link
                  to={"/favorites"}
                  onClick={(event) => {
                    setMenuSmallScreen(!menuSmallScreen);
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} /> Favoris
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      )}
    </header>
  );
}
