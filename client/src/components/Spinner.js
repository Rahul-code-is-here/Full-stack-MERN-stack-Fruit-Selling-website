import React, { useState, useEffect } from "react"; //useEffect initial time e get karva
import { useNavigate,useLocation } from "react-router-dom";  // useLocation: unauthorize mano ke dahboard ne access karva mage che to login pachi sidho tya redirect

//user hoi ne route thi admin ne aceess kare tyare direct login aavtu tu means automatic logout thai jatu tu, ena badle login j re and home page  e redirect karva {path = "login"} {   navigate(`/${path}`}
const Spinner = ({path = "login"}) => {  //initialy em nam login e j lai jashe
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location= useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue); //prevValue 5 che dar vakhte -1 thashe
    }, 1000); // count 0 etle navigate karo
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname, // login pachi e je path mate login karva magto to e page e redirect thashe
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">redirecting to you in {count} second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};
export default Spinner;
