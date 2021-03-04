import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "reactstrap";
import { useAppContext } from "../../../services/contextLib";
const HeroJumbo = () => (
  <div>
    <Jumbotron>
      <h1 className="display-3">New Here?</h1>
      <p className="lead">
        Browse hundreds of companies and thousands of stocks using Stocks Watch,
        the Stock App, made for you...
      </p>
      <Link to="/stocks">
        <Button color="primary">Begin Browsing</Button>
      </Link>
      <hr className="my-2" />
      {DisplayLoginPrompt()}
    </Jumbotron>
  </div>
);

function DisplayLoginPrompt() {
  const { isAuth } = useAppContext();
  if (!isAuth) {
    return (
      <div>
        <Link to="/log-in"> Log In </Link>
        <span className="p-2">|</span>

        <Link to="/sign-up"> Sign Up</Link>
      </div>
    );
  }
}

export default HeroJumbo;
