import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link, Switch, BrowserRouter } from "react-router-dom";


import Register from './Register'
import Login from './Login'
import Home from './Home'
import Post from './Post'

function App() {

  return (
    <BrowserRouter>

      <div className="App">

        <div className="nav-links">
          <ul className="links">
            <li>
              <Link to="/">Camagru</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>

          </ul>
        </div>

        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />

          <Route exact path="/post/:id" component={Post} />

          <Route exact path="/" component={Home} />
        </Switch>
      </div>

    </BrowserRouter>

  );

}

export default App;
