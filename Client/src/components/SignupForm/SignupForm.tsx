import './signup-form.css';
import { Formik, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { InputField } from "../../components";
import { SignupFormValues } from "./types";
import { SignupSchema } from "./Validation";


export default function SignupForm(){
  const navigate = useNavigate();
    const handleFormSubmit = (values: SignupFormValues, actions: any) => {
        actions.resetForm();
     
        axios.post('http://localhost:8001/signup',  values )
        .then(response => {
          if (response.data.success) {
              alert(response.data.message);
              navigate('/Signin')
          } else {
              alert(response.data.message);
          }
        })
        .catch(err => console.error('Axios Error:', err))
      };
    return(
        <>
<Formik
initialValues={{
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  budgetLimit: "",
}}
validationSchema={SignupSchema}
onSubmit={handleFormSubmit}
>
<Form className="form">
  <InputField
    type="text"
    name="firstName"
    placeholder="First Name *"
  />

  <InputField
    type="text"
    name="lastName"
    placeholder="Last Name *"
  />

  <InputField type="email" name="email" placeholder="Email *" />

  <InputField
    type="password"
    name="password"
    placeholder="Password *"
  />

  <InputField
    type="password"
    name="confirmPassword"
    placeholder="Confirm Password *"
  />

  <InputField
    type="number"
    name="budgetLimit"
    placeholder="Budget Limit *"
  />

  <button className="submit" type="submit">
    Submit
  </button>
</Form>
</Formik>
</>
)
}
