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

import './index.css';

const Root = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
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
