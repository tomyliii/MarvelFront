import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Personnage from "./Pages/Personnage/Personnage";
import Personnages from "./Pages/Personnages/Personnages";
import Comics from "./Pages/Comics/Comics";
import Comic from "./Pages/Comic/Comic";
import Favorites from "./Pages/Favorites/Favorites";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  const [nickname, setNickname] = useState(Cookies.get("nickname") || "");
  // const server = "http://127.0.0.1:3000";
  const server = "https://site--marvelback--tzmxcvqjqbzq.code.run";
  return (
    <>
      <Router>
        <Header
          setToken={setToken}
          token={token}
          server={server}
          setNickname={setNickname}
        />
        <Routes>
          <Route
            path="/"
            element={<Personnages token={token} server={server} />}
          />
          <Route
            path="personnage/:id"
            element={<Personnage token={token} server={server} />}
          />
          <Route
            path="comics"
            element={<Comics token={token} server={server} />}
          />
          <Route
            path="comic/:id"
            element={<Comic token={token} server={server} />}
          />
          <Route
            path="favorites"
            element={<Favorites token={token} server={server} />}
          />
          <Route
            path="login"
            element={
              <Login
                setToken={setToken}
                server={server}
                setNickname={setNickname}
              />
            }
          />
          <Route
            path="signup"
            element={
              <SignUp
                setToken={setToken}
                server={server}
                setNickname={setNickname}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
