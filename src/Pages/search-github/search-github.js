import React, { Component } from 'react';
import axios from 'axios';
import showdown from 'showdown';

import '../search-github/search-github.css';

import SearchForm from "../../Components/search-form/search-form";
import SearchResults from "../../Components/search-results/search-results";
import SearchNoResults from "../../Components/search-no-results/search-no-results";
import RepoModal from "../../Components/repo-modal/repo-modal";

class SearchGithub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      githubData: [],
      currentReadme: '',
      currentRepo: null,
      modalIn: false,
      numberOfResults: 0,
      loading: false,
      getReposError: false
    };

    this.modalIn = this.modalIn.bind(this);
    this.modalOut = this.modalOut.bind(this);
    this.modalShow = this.modalShow.bind(this);
    this.modalHide = this.modalHide.bind(this);
    this.getRepoData = this.getRepoData.bind(this);
    this.viewRepoDetail = this.viewRepoDetail.bind(this);
    this.loadingIn = this.loadingIn.bind(this);
    this.loadingOut = this.loadingOut.bind(this);
  }

  // use state data to query github api and update state data to update view
  getRepoData(search) {

    this.loadingIn();

    axios
      .get(`https://api.github.com/search/repositories?q=${search}+in:name`)
      .then(res => {
        const data = res.data.items;
        const numberOfResults = res.data.items.length;

        this.setState({
          githubData: data,
          numberOfResults: numberOfResults
        });

        if (numberOfResults < 1) {
          this.getReposError();
        } else {
          this.resetReposError();
        }

        this.loadingOut();
      })
      .catch((error) => {
        console.log(error);
        this.loadingOut();
        this.getReposError();
      });
  }

  // set the error state so that we can show the no-results view
  getReposError() {

    this.setState({
      getReposError: true
    });
  }

  resetReposError() {

    this.setState({
      getReposError: false
    });
  }

  // get more detail on repo
  viewRepoDetail (repo) {
    this.loadingIn();

    this.setState({
      currentRepo: repo
    });

    axios
      .get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`)
      .then(res => {
        const readmeUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/master/README.md`;
        this.getRawReadme(readmeUrl);
      })
      .catch((error) => {
        console.log(error);
        this.modalIn();
        this.loadingOut();
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
          currentReadme: markdownHtml
        });

        this.modalIn();
        this.loadingOut();
      })
      .catch((error) => {
        console.log(error);
        this.modalIn();
        this.loadingOut();
      });
  }

  // find and update html tag with modal-in class
  modalIn() {
    this.setState({
      modalIn: true
    });
    const _Html = document.querySelector('html');
    const _Body = document.querySelector('body');
    _Html.classList.add('modal-in');

    _Body.addEventListener('transitionend', this.modalShow);
  }

  modalShow() {
    const _Body = document.querySelector('body');
    const _Html = document.querySelector('html');
    _Html.classList.add('modal-show');

    _Body.removeEventListener('transitionend', this.modalShow);
  }

  // modal close handler
  modalOut() {
    this.setState({
      modalIn: false
    });
    const _Html = document.querySelector('html');
    const _Body = document.querySelector('body');
    _Html.classList.remove('modal-show');

    _Body.addEventListener('transitionend', this.modalHide);
  }

  modalHide() {
    const _Body = document.querySelector('body');
    const _Html = document.querySelector('html');
    _Html.classList.remove('modal-in');
    
    _Body.removeEventListener('transitionend', this.modalHide);
  }

  loadingIn() {
    this.setState({
      loading: true
    });
  }

  loadingOut() {
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <section className={"search block block--size-a " + (this.state.loading ? 'loading' : '')}>
        <span className="spinner"></span>
        <header className="search__header">
          <h2 className="search__title">Search Github Repos</h2>
        </header>

        <SearchForm
          getRepoData={this.getRepoData}
        />

        <SearchResults
          githubData={this.state.githubData}
          viewRepoDetail={this.viewRepoDetail}
          numberOfResults={this.state.numberOfResults}
        />

        <RepoModal
          modalIn={this.state.modalIn}
          modalOut={this.modalOut}
          currentRepo={this.state.currentRepo}
          currentReadme={this.state.currentReadme}
        />

        {
          this.state.getReposError ?
          <SearchNoResults />
          : null
        }
      </section>
    );
  }
}

export default SearchGithub;