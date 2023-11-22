import './signup.css';
import { NavLink } from "react-router-dom";
import { SignupForm } from "../../components";

const logoPath = process.env.PUBLIC_URL + "/Images/Logo.webp";

export default function Signup() {

  return (
    <>
      <section className="body">
        <article className="content-wrapper">
          <section className="logo-wrapper">
            <h4 className="text">Start your journey with us</h4>
            <img className="logo" src={logoPath} alt="logo" />
          </section>
          <section className="form-wrapper">
            <p className="caption">Signup</p>
            <p className="link">
              <NavLink to="/signin">Already have an account?</NavLink>
            </p>
            <SignupForm/>
          </section>
        </article>
      </section>
    </>
  );
}
