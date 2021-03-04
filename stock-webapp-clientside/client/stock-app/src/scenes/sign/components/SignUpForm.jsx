import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, FormGroup, Form } from "reactstrap";

import { useAppContext } from "../../../services/contextLib";
import { handleRegistration } from "../../../services/AccessApi";
import { displayError } from "../../../services/GeneralHelper";
import InputForm from "../../../components/reusableComponents/InputForm";

const SignUpForm = () => {
  const { userHasAuth } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  return (
    <div>
      <h1 className="title__font"> Sign Up</h1>
      <Container className="login-container">
        <FormGroup
          onSubmit={(event) =>
            handleRegistration(
              email,
              password,
              rePassword,
              setErrorMessage,
              setPassword,
              setRePassword,
              userHasAuth,
              history
            )
          }
        >
          <h1 className="text-center">Stocks Watch</h1>
          {InputForm("text", "Email", email, setEmail)}
          {InputForm("password", "Password", password, setPassword)}
          {InputForm("password", "Retype-Password", rePassword, setRePassword)}
          {displayError(errorMessage)}
          <Form onSubmit={(event) => event.preventDefault()}>
            <Button className="btn-lg btn-dark btn-block"> Sign Up</Button>
          </Form>
        </FormGroup>
      </Container>
    </div>
  );
};

export default SignUpForm;
