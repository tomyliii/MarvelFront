import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login(props) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      if (mail && password) {
        const response = await axios.post(`${props.server}/user/login`, {
          mail,
          password,
        });
        console.log(response.data);
        Cookies.set("userToken", response.data.token, 1, { secure: true });
        Cookies.set("nickname", response.data.nickname, 1, {
          secure: true,
        });
        props.setToken(Cookies.get("userToken"));
        props.setNickname(Cookies.get("nickname"));

        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <main>
      <h2>Connecte-toi</h2>
      <form
        onSubmit={(event) => {
          handleOnSubmit(event);
        }}
      >
        <input
          type="email"
          value={mail}
          onChange={(event) => {
            setMail(event.target.value);
          }}
          placeholder="Adresse e-mail"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Mot de passe"
          required
        />

        <input type="submit" value="Valider" />
        <p>Message erreur</p>
      </form>
      <p>
        Ou inscris-toi avec &nbsp;
        <Link to={"/signup"}>E-mail.</Link>
      </p>
    </main>
  );
}
