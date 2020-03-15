import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import { render } from '@testing-library/react';
import {Switch, Route} from 'react-router-dom';
import Header from './Header';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header></Header>
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component = {LinkList}></Route>
            <Route exact path="/create" component = {CreateLink}></Route>
            <Route exact path="/login" component = {Login}></Route>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
