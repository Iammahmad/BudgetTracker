import * as Yup from "yup"
 
 export const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
    .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
    budgetLimit: Yup.number().required("Budget Limit is required"),
  });
  