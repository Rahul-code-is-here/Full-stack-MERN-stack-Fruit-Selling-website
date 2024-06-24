import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios"; //aanathi network request send karishu
import { useNavigate, useLocation } from "react-router-dom"; // navigate karva
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../../styles/Login.css"; // Custom CSS for additional styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault(); //refresh thatu bandh thata and singlr page app bani reshe
    //    console.log(name,email,password,phone,address);
    //    toast.success("Register Succesfully")
    try {
      const res = await axios.post("/api/v1/auth/login", {
        // aa route par req mokli with nichena parameter
        email,
        password,
      });
      if (res && res.data.success) {
        //authController.js ma jya success true hashe tyano message get kari lyo and toast thi show karavo
        toast.success(res.data && res.data.message);
        //sucess req ma navigate pela set kari daie
        setAuth({
          ...auth, //previous auth value as it is
          user: res.data.user,
          token: res.data.token,
        }); // have aa data user and token home page ma show karashe but refresh karta vyo jashe so local storage ma store karavo padashe
        localStorage.setItem("auth", JSON.stringify(res.data)); // json data local storage ma support na kre etle JSON.stringify
        navigate(location.state || "/"); //spinner ma location additional object state ma pass karavyo and login ma login thata pela e state ne check karie chie
        //so je state hashe tya redirect or state nai hoi to home page e redirect
      } else {
        toast.success(res.data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login - Vegitable App"}>
      <div className="login-container d-flex align-items-center justify-content-center">
        <div className="login-card p-4 shadow-lg">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
