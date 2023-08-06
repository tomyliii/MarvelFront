import { Link, useLocation, useNavigate } from "react-router-dom";
import "./signUp.css";
import { useState } from "react";
import {
  checkConfirmPassword,
  checkDate,
  checkMail,
  checkNames,
  checkPassword,
} from "../../assets/Tools/CheckFunctions";
import axios from "axios";
import Cookies from "js-cookie";
import DragAndDropSingUp from "../../Components/DragAndDrop/DragAndDrop";
export default function SignUp(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorLastname, setErrorLastname] = useState("");
  const [errorNickname, setErrorNickname] = useState("");
  const [errorFirstname, setErrorFirstname] = useState("");
  const [errorDateOfBirth, setErrorDateOfBirth] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [file, setFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(location);
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (
      lastname &&
      nickname &&
      firstname &&
      mail &&
      password &&
      confirmPassword &&
      errorDateOfBirth == "" &&
      dateOfBirth &&
      errorMail === "" &&
      errorPassword === "" &&
      errorConfirmPassword === "" &&
      errorLastname === "" &&
      errorFirstname === "" &&
      errorNickname === ""
    ) {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("mail", mail.toUpperCase().trim());
      formData.append("password", password);
      formData.append("nickname", nickname);
      formData.append("lastname", lastname);
      formData.append("dateOfBirth", dateOfBirth);
      if (file) {
        for (let i = 0; i < file.length; i++) {
          formData.append("productImg", file[i]);
        }
      }
      try {
        const response = await axios.post(
          `${props.server}/user/createaccount`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Cookies.set("userToken", response.data.token, 1, { secure: true });
        Cookies.set("nickname", nickname, 1, {
          secure: true,
        });
        props.setNickname(nickname);
        props.setToken(Cookies.get("userToken"));
        console.log(location);
        if (location.state?.path) {
          navigate(location.state.path);
        } else {
          navigate("/");
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    } else {
      checkDate(dateOfBirth, setDateOfBirth, setErrorDateOfBirth);
      checkNames(lastname, setLastname, setErrorLastname);
      checkNames(firstname, setFirstname, setErrorFirstname);
      checkNames(nickname, setNickname, setErrorNickname);
      checkMail(mail, setMail, setErrorMail);
      checkPassword(password, setPassword, setErrorPassword);
      checkConfirmPassword(
        confirmPassword,
        password,
        setConfirmPassword,
        setErrorConfirmPassword
      );
    }
  };

  return (
    <main className="singUp-page">
      <div className="wrapper">
        <h2>Inscris-toi</h2>
        <form
          onSubmit={(event) => {
            handleOnSubmit(event);
          }}
        >
          <DragAndDropSingUp setFile={setFile} />
          <div>
            <input
              type="text"
              value={firstname}
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
              onBlur={(event) => {
                checkNames(event.target.value, setFirstname, setErrorFirstname);
              }}
              placeholder="Prénom"
              required
            />
            <p className={`info ${errorFirstname && "error"}`}>
              {errorFirstname && errorFirstname}
            </p>
          </div>
          <div>
            <input
              type="text"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
              }}
              onBlur={(event) => {
                checkNames(event.target.value, setNickname, setErrorNickname);
              }}
              placeholder="Nom de super-héro"
              required
            />
            <p className={`info ${errorNickname && "error"}`}>
              {errorNickname && errorNickname}
            </p>
          </div>
          <div>
            <input
              type="text"
              value={lastname}
              onChange={(event) => {
                setLastname(event.target.value);
              }}
              onBlur={(event) => {
                checkNames(event.target.value, setLastname, setErrorLastname);
              }}
              placeholder="Nom"
              required
            />
            <p className={`info ${errorLastname && "error"}`}>
              {errorLastname && errorLastname}
            </p>
          </div>
          <div>
            <input
              type="email"
              value={mail}
              onChange={(event) => {
                setMail(event.target.value);
              }}
              placeholder="Adresse e-mail"
              onBlur={(event) => {
                checkMail(event.target.value, setMail, setErrorMail);
              }}
              required
            />
            <p className={`info ${errorMail && "error"}`}>
              {errorMail && errorMail}
            </p>
          </div>
          <div className="birthday-section">
            <label htmlFor="dateOfBirth">Date de naissance: </label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(event) => {
                setDateOfBirth(event.target.value);
              }}
              onBlur={(event) => {
                checkDate(
                  event.target.value,
                  setDateOfBirth,
                  setErrorDateOfBirth
                );
              }}
              required
            />
            <p className={`info ${errorDateOfBirth && "error"}`}>
              {errorDateOfBirth && errorDateOfBirth}
            </p>
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onBlur={(event) => {
                checkPassword(
                  event.target.value,
                  setPassword,
                  setErrorPassword
                );
              }}
              placeholder="Mot de passe"
              required
            />
            <p className={`info ${errorPassword && "error"}`}>
              {errorPassword
                ? errorPassword
                : "Il doit contenir 7 lettres minimum, dont au moins un chiffre."}
            </p>
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              onBlur={(event) => {
                checkConfirmPassword(
                  event.target.value,
                  password,
                  setConfirmPassword,
                  setErrorConfirmPassword
                );
              }}
              placeholder="Confirme ton mot de passe"
              required
            />
            <p className={`info ${errorConfirmPassword && "error"}`}>
              {errorConfirmPassword && errorConfirmPassword}
            </p>
          </div>
          <input type="submit" value="Valider" className="validation" />
          {errorMessage && <p>{errorMessage}</p>}
        </form>
        <p>
          Déja inscrit ? &nbsp;
          <Link to={"/login"}>Click ici.</Link>
        </p>
      </div>
    </main>
  );
}
