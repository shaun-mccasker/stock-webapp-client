import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, FormGroup, Form } from "reactstrap";
import { Link } from "react-router-dom";
//styling and components imports

import { useAppContext } from "../../../services/contextLib";
import { handleLogIn } from "../../../services/AccessApi";
import { displayError } from "../../../services/GeneralHelper";
import InputForm from "../../../components/reusableComponents/InputForm";

const LogInForm = () => {
  const { userHasAuth } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  return (
    <div>
      <h1 className="title__font"> Log In</h1>
      <Container className="login-container">
        <FormGroup
          onSubmit={(event) =>
            handleLogIn(
              email,
              password,
              setPassword,
              setErrorMessage,
              userHasAuth,
              history
            )
          }
        >
          <h1 className="text-center">Stocks Watch</h1>
          {InputForm("text", "Email", email, setEmail)}
          {InputForm("password", "Password", password, setPassword)}
          {displayError(errorMessage)}
          <Form onSubmit={(event) => event.preventDefault()}>
            <Button className="btn-lg btn-dark btn-block">Log In</Button>
          </Form>
        </FormGroup>
        <div className="text-center">
          <Link to="/sign-up">Sign Up</Link>
          <span className="p-2">|</span>
          <Link to="/reset-password">Forgot Password</Link>
        </div>
      </Container>
    </div>
  );
};

export default LogInForm;
