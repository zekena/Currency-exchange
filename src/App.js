import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Currencies from "./components/currencies.component";
import AddCurrency from "./components/AddCurrency.component";
import logo from "./15507.png";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav>
            <div className="nav-wrapper blue">
              <a className="center brand-logo" href="https://github.com/zekena">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  alt="Currencies exchange rate"
                />
              </a>
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li>
                  <Link to="/">Currencies</Link>
                </li>
                <li>
                  <Link to="/create">Add new currency</Link>
                </li>
                <li>
                  <a href="http://localhost:5000/api-docs">API docs</a>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={Currencies} />
          <Route path="/create" component={AddCurrency} />
        </div>
      </Router>
    );
  }
}
