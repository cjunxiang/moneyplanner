import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './Components/MainPage';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/login' component={MainPage} />
        <Route exact path='/signup' component={MainPage} />
      </Router>
    );
  }
}
