import React, { Component } from 'react';
import '../search-github/search-github.css';
import axios from 'axios';

class SearchGithub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repoName: '',
      githubData: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const _Target = event.target;
    const targetVal = _Target.value;
    const targetName = _Target.name;

    this.setState({
      [targetName]: targetVal
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.getRepoData();
  }

  getRepoData() {
    
    axios.get(`https://api.github.com/search/repositories?q=${this.state.repoName}`)
      .then(res => {
        console.log(res);
        const data = res.data.items.map(obj => obj);
        console.log(data);

        this.setState({
          githubData: data
        });
      });
  }

  render() {
    return (
      <div>
        <h2>Search Github Repo's</h2>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form__input-container">
            <label htmlFor="repoName">
              Repo Name:
            </label>
            <input
              name="repoName"
              type="text"
              value={this.state.repoName}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form__actions">
            <button>Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchGithub;