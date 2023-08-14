import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { Navbar } from "./Navbar";
import { HomePage } from "./Pages/HomePage/HomePagee";
import { DetailPage } from "./Pages/DetailPage/DetailPage";
import { FormPage } from "./Pages/FormPage/FormPage";
import { Provider } from "react-redux";
import store from "./Redux/store/index";

import "./app.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/crear" component={FormPage} />
            <Route path="/detalle/:pokemonId" component={DetailPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
