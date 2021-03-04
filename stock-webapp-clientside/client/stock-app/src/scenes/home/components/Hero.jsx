import React from "react";
import { Container } from "reactstrap";

import HeroJumbo from "./HeroJumbo";

const Hero = () => (
  <section>
    <div className="hero__content">
      <h1 className="title__font">Stocks Watch</h1>
      <div className="hero__jumbo">
        <h2>Welcome to the new world of riches...</h2>
        <hr></hr>
        <Container>
          <HeroJumbo />
        </Container>
      </div>
    </div>
  </section>
);

export default Hero;
