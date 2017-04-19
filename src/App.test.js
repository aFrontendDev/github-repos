import React from 'react';
import ReactDOM from 'react-dom';
import SearchGithub from "./Pages/search-github/search-github";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchGithub />, div);
});
