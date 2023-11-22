import { Formik, Form} from "formik";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { SigninFormValues } from "./types";
import { SigninSchema } from "./Validation";
import { InputField } from "../../components";


export default function SigninForm(){
  const navigate = useNavigate();
    const handleFormSubmit = (values: SigninFormValues, actions: any) => {
        actions.resetForm(SigninSchema);
        axios.post('http://localhost:8001/login', values)
        .then(response => {
            const { success, message, token } = response.data;

            if (success && token) {
                localStorage.setItem('token', token);
                navigate('/home');
            } else {
                alert(`Login failed: ${message}`);
            }
        })
        .catch(err => {
            console.error('Axios Error:', err);
        });
      };
    return(
        <>
    <Formik
    initialValues={{
      email: "",
      password: "",
    }}
    validationSchema={SigninSchema}
    onSubmit={handleFormSubmit}
  >
    <Form className="form">
      <InputField
        type="email"
        name="email"
        placeholder="Email *"
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password *"
      />
      <button className="submit" type="submit">
        Login
      </button>
    </Form>
  </Formik>
  </>
  )
}