import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Home from './Pages/home/home';
import NotFound from "./Pages/404/404";
import About from "./Pages/about/about";
import SearchGithub from "./Pages/search-github/search-github";

import './index.css';

const Root = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={SearchGithub} />
                <Route exact path="/search-github/" component={SearchGithub} />
                <Route exact path="/home/" component={Home} />
                <Route path="/about/" component={About} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
