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

        <main className="main" id="main">
            <header class="header" id="header" role="banner" itemscope itemtype="http://schema.org/WPHeader">
                <h1 className="visually-hidden" itemscope itemtype="http://schema.org/WPHeader">Github Repos Search</h1>
            </header>
            <div className="layout">
                <div className="region region--a">
                    <div className="region-inner">
                        <Router>
                            <Switch>
                                <Route exact path="/" component={SearchGithub} />
                                <Route exact path="/search-github/" component={SearchGithub} />
                                <Route component={SearchGithub} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        </main>
    )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
