import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom"; //  <Outlet /> nested routing mate use tahi
import axios from "axios";
import Spinner from "../../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck(); //auth condtion check pachi token male che to authCheck() ne call karo
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />; // user hoi ne route thi admin ne aceess kare tyare direct login aavtu tu means automatic logout thai jatu tu, ena badle login j re and home page  e redirect karva spinner ma path nakhyo
}
