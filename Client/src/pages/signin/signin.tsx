import { NavLink } from "react-router-dom";

import "./signin.css";
import { SigninForm } from "../../components";

const loginlogo = process.env.PUBLIC_URL + "/Images/loginLogo.png";

export default function Signin() {

  return (
    <>
      <section className="body">
        <article className="login-content-wrapper">
          <section className="logo-wrapper">
            <h4 className="text">
              Welcome back! Continue your journey with us
            </h4>
            <img className="logo" src={loginlogo} alt="logo" />
          </section>
          <section className="form-wrapper">
            <p className="caption">Login</p>
            <p className="link">
              <NavLink to="/">Don't Have an Account ?</NavLink>
            </p>
            <SigninForm/>
          </section>
        </article>
      </section>
    </>
  );
}
