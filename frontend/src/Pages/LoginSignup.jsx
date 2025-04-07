import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (state === "Sign Up" && !formData.username.trim()) {
      alert("Username is required for Sign Up!");
      return false;
    }

    if (!formData.email.trim()) {
      alert("Email is required!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Enter a valid email address!");
      return false;
    }

    if (!formData.password.trim() || formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return false;
    }

    const agreeCheckbox = document.querySelector("input[type='checkbox']");
    if (!agreeCheckbox.checked) {
      alert("You must agree to the terms of use and privacy policy!");
      return false;
    }

    return true;
  };

  const login = async () => {
    if (!validateForm()) return;

    let dataObj;
    await fetch("https://react-project-28jc.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });
    console.log(dataObj);
    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      window.location.replace("/");
    } else {
      alert(dataObj.errors);
    }
  };

  const signup = async () => {
    if (!validateForm()) return;

    let dataObj;
    await fetch("https://react-project-28jc.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      window.location.replace("/");
    } else {
      alert(dataObj.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button onClick={() => (state === "Login" ? login() : signup())}>Continue</button>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account? <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account? <span onClick={() => setState("Login")}>Login here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="agree" id="agree" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
