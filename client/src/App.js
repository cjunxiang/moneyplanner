import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./Components/MainPage";
import LoginPage from "./Components/Authentication/LoginPage";
import DataViz from "./Components/DataViz/DataViz";
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={MainPage} />
        <Route exact path="/dataviz" component={DataViz} />
      </Router>
    );
  }
}
