import React, { Component } from 'react';
import '../search-github/search-github.css';
import axios from 'axios';
import showdown from 'showdown';

class SearchGithub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repoName: '',
      githubData: [],
      currentReadme: null,
      currentRepo: null,
      modalIn: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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
      .get(`https://api.github.com/search/repositories?q=${this.state.repoName}+in:name`)
      .then(res => {
        // console.log(res);
        const data = res.data.items;
        // const matchingNames = data.filter(obj => obj.name.indexOf(this.state.repoName) >= 0);
        // console.log(data);
        console.log(data);

        this.setState({
          githubData: data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // get more detail on repo
  viewRepoDetail (repo) {
    // console.log(repo);
    console.log(repo.owner.login);
    console.log(repo.name);
    this.setState({
      currentRepo: repo
    });

    axios
      .get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`)
      .then(res => {
        console.log(res);
        const readmeUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/master/README.md`;
        this.getRawReadme(readmeUrl);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modalIn: true
        });
      });
  }

  // get the readme contents of repo
  getRawReadme(url) {
    axios
      .get(url)
      .then(res => {

        // convert markdown to html string
        const converter = new showdown.Converter();
        const markdownHtml = converter.makeHtml(res.data);

        this.setState({
          currentReadme: markdownHtml,
          modalIn: true
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modalIn: true
        });
      });
  }

  // modal close handler
  handleCloseModal() {
    this.setState({
      modalIn: false
    });
  }

  // convert html string to html
  createMarkup() {
    return {__html: this.state.currentReadme};
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

        <modal className={"modal " + (this.state.modalIn ? 'modal--in' : '')}>
          <button className="modal__close" onClick={this.handleCloseModal}>
            <svg xmlns="http://www.w3.org/2000/svg">
              <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
            </svg>
            <span className="visually-hidden">Close</span>
          </button>
          <div className="modal__inner">
          {
            this.state.currentRepo ?
            <div>
              <h4>{this.state.currentRepo.name}</h4>
              <a href={this.state.currentRepo.url}>
                {this.state.currentRepo.url}
              </a>
              <ul>
                <li>{this.state.currentRepo.full_name}</li>
                <li>{this.state.currentRepo.language}</li>
                <li>{this.state.currentRepo.created_at}</li>
                <li>{this.state.currentRepo.owner.login}</li>
              </ul>
            </div>
            : null
          }

          {
            this.state.currentReadme ?
            <div className="readme" dangerouslySetInnerHTML={this.createMarkup()} />
            : null
          }
          </div>
        </modal>
      </div>
    );
  }
}

export default SearchGithub;