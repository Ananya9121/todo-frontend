import React, { useState } from "react";
import loginStyle from"./Login.module.css";
import axios from "axios";
import {  useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { config } from "../../../../App";
import Header from "../../../Shared/Header";

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [userDetails, setuserDetails] = useState({
    password: "",
    username: "",

  });

  const login = async (userDetails) => {
    if (!validation(userDetails)) return;

    try {

      let url = `${config.endpoint}/user/login`;
      let response = await axios.post(url, {
        userName: userDetails.username,
        password: userDetails.password,
      });
      
      const resToken = response.data.token;

      persistLogin(resToken);

      navigate("/todo");

      enqueueSnackbar("Logged in  Successfully", { variant: "success" });
    } catch (e) {
      if (e.response && e.response.status === 401) {
        enqueueSnackbar("Invalid Email or Password !", { variant: "error" });
      }
       else {
         enqueueSnackbar("Something went wrong!", { variant: "error" });
       }
    }
  };

  const persistLogin = (token) => {
    localStorage.setItem("token", token);
  };

  const validation = (data) => {
    if (userDetails.username.length === 0) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }

    if (userDetails.password.length === 0) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }

    return true;
  };


  const handleChange = (e) => {
    let [key, value] = [e.target.name, e.target.value];
    setuserDetails({ ...userDetails, [key]: value });
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
    <Header />
    <Link className="link" to="/"> <button
    className="btn btn-outline-secondary text-white"
    type="button"
        >
            Signup
        </button></Link>
   
       </div>      <div className={loginStyle.main}>
        <p className={loginStyle.fontstyle}>Login!</p>
        <br />


        <div>
          <form>
            <div className="row mb-3">
            <div className={loginStyle.labelwidth}>
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                Username
              </label>
              </div>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="colFormLabel"
                  placeholder="Enter the username"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.username}
                  type="text"
                  name="username"
                ></input>
              </div>
            </div>

            <div className="row mb-3">
              <div className={loginStyle.labelwidth}>
              <label
                htmlFor="colFormLabeloption2"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              </div>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="colFormLabeloption2"
                  placeholder="Enter the Password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.password}
                  name="password"
                ></input>
              </div>
            </div>

            <br />
            <div className={loginStyle.centrealign}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={async (e) => {
                  await login(userDetails);
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
