import { useState, useEffect, useContext, createContext } from "react"; //initial time e value ne get karva useEffect hook use kari shakie
// useEffect function che jeni andar multiple function exicute kari shakie
import axios from "axios";

//context create kari authContext variable ma store karavie
const AuthContext = createContext();
// AuthProvider thi nichena state globally acess kari shakie
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  // private.js na private route ma je useEffect ma res che tema header pass karvana badle ahi set kari daishu
  axios.defaults.headers.common['Authorization'] = auth?.token  // auth che? hoi to token ne full fill kro

  // login karya pachi data aavyo e refresh thata jato ryo but local storage ma save rakhyo che tene get karva
  // palishrom func create karyu inside useEffect
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable next line: contious watch karavni jarur nathi, auth provider use effect ni bahar che so continoulsy watch karsshe but local storage hovana lidhe watch karvani karur nathi so [] ne empty rakhyu nahitar [auth] rakhet
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

// have aane gamee tya use kaari shakie, kese karenge: index.js ma  configure karine
