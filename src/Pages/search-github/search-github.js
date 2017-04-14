import React, { Component } from 'react';
import '../search-github/search-github.css';
import axios from 'axios';

class SearchGithub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repoName: '',
      githubData: [],
      currentReadme: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // on input change update state
  handleInputChange(event) {
    const _Target = event.target;
    const targetVal = _Target.value;
    const targetName = _Target.name;

    this.setState({
      [targetName]: targetVal
    });
  }

  // handle form submit event to search github api for repos
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.getRepoData();
  }

  // use state data to query github api and update state data to update view
  getRepoData() {
    axios
      .get(`https://api.github.com/search/repositories?q=${this.state.repoName}`)
      .then(res => {
        // console.log(res);
        const data = res.data.items;
        const matchingNames = data.filter(obj => obj.name.indexOf(this.state.repoName) >= 0);
        // console.log(data);
        console.log(matchingNames);

        this.setState({
          githubData: matchingNames
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // get more detail on repo
  viewRepoDetail (repo) {
    console.log(this);
    console.log(repo);
    console.log(repo.owner.login);
    console.log(repo.name);
    
    axios
      .get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`)
      .then(res => {
        console.log(res);
        const readmeUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/master/README.md`;
        this.getRawReadme(readmeUrl);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // get the readme contents of repo
  getRawReadme(url) {
    axios
      .get(url)
      .then(res => {
        console.log(res);
        console.log(res.data);

        this.setState({
          currentReadme: res.data
        });
      })
      .catch(function (error) {
        console.log(error);
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

        <section className="results">
          <header className="results__header">
            <h3 className="results__title">Search Results</h3>
          </header>
          <div className="results__body">
            {
              this.state.githubData.map(function(repo) {
                let itemClick = this.viewRepoDetail.bind(this, repo);
                return (
                  <div key={repo.id} className="results__item">
                    <h4>{repo.name}</h4>
                    <a href={repo.url}>
                      {repo.url}
                    </a>
                    <ul>
                      <li>{repo.full_name}</li>
                      <li>{repo.language}</li>
                      <li>{repo.created_at}</li>
                      <li>{repo.owner.login}</li>
                    </ul>
                    <button onClick={itemClick}>View Details</button>
                  </div>
                );
              }, this)}
          </div>
        </section>
      </div>
    );
  }
}

export default SearchGithub;