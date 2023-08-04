const checkNames = (value, set, setError) => {
  if (!value) {
    return setError("Cette case ne peut être vide.");
  } else {
    setError("");
    set(value);
  }
};
const checkDate = (value, set, setError) => {
  if (!value) {
    return setError("Cette case ne peut être vide.");
  } else {
    setError("");
    set(value);
  }
};
const checkMail = (value, set, setError) => {
  const regexMail = new RegExp("[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]{2,3}");
  if (value === "") {
    return setError("Ton adresse e-mail ne peut etre vide");
  }
  if (regexMail.test(value)) {
    set(value);
    setError("");
  } else {
    setError("Ton adresse e-mail n'est pas valide.");
  }
};
const checkPassword = (value, set, setError) => {
  const regexLetters = new RegExp("[a-zA-Z]{1,}");
  const regexNumber = new RegExp("[0-9]{1,}");
  const regexGlobal = new RegExp("[a-zA-Z0-9]{7,}");
  if (value === "") {
    return setError("Ton mot de passe ne peut être vide.");
  }
  if (!regexLetters.test(value)) {
    return setError("Ton mot de passe doit contenir au moins une lettre.");
  }
  if (!regexNumber.test(value)) {
    return setError("Ton mot de passe doit contenir au moins un chiffre.");
  }
  if (!regexGlobal.test(value)) {
    return setError("Ton mot de passe doit contenir minimum sept caratères.");
  } else {
    setError("");
    set(value);
  }
};

const checkConfirmPassword = (value, value2, set, setError) => {
  if (value2 !== value) {
    setError("Les mots de passe doivent être identiques.");
  } else {
    setError("");
    set(value);
  }
};

export {
  checkConfirmPassword,
  checkPassword,
  checkMail,
  checkNames,
  checkDate,
};
