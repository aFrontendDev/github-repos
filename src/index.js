import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import SearchGithub from "./Pages/search-github/search-github";

import './styles/styles.css';

const Root = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={SearchGithub} />
                <Route exact path="/search-github/" component={SearchGithub} />
                <Route component={SearchGithub} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
