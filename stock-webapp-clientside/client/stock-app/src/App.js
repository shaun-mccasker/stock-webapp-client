import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//

import { AppContext } from "./services/contextLib";
//import scenes
import Home from "./scenes/home/HomePage";
import LogIn from "./scenes/sign/LogIn";
import SignUp from "./scenes/sign/SignUp";
import StockCompanies from "./scenes/stockCompanies/StockCompanies";
import StocksBySymbol from "./scenes/stocksBySymbol/StocksbySymbol";
import Header from "./components/Header";
import Error404 from "./scenes/Error404";
export default function App() {
  const [isAuth, userHasAuth] = useState(false);
  const [companySelected, setCompanySelected] = useState("");
  return (
    <Router>
      <AppContext.Provider
        value={{
          isAuth,
          userHasAuth,
          companySelected,
          setCompanySelected,
        }}
      >
        <Header />
        <div className="App">
          <body className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/log-in">
                <LogIn />
              </Route>
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              <Route exact path="/stocks">
                <StockCompanies />
              </Route>
              <Route exact path={"/stocks/symbol/" + companySelected}>
                <StocksBySymbol />
              </Route>
              <Route component={Error404} />
            </Switch>
          </body>
        </div>
      </AppContext.Provider>
    </Router>
  );
}
