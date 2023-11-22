import { ErrorMessage, Field } from "formik";
import { Fragment } from "react";

import "./input-field.css";

const InputField = (props: any) => {
  return (
    <Fragment>
      <Field className="input" {...props} />
      <ErrorMessage
        className="error-message"
        name={props.name}
        component="div"
      />
    </Fragment>
  );
};

export default InputField;
