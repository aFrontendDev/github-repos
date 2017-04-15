import React, { Component } from 'react';
import axios from 'axios';
import showdown from 'showdown';

import '../search-github/search-github.css';

import SearchForm from "../../Components/search-form/search-form";
import SearchResults from "../../Components/search-results/search-results";
import RepoModal from "../../Components/repo-modal/repo-modal";

class SearchGithub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      githubData: [],
      currentReadme: '',
      currentRepo: null,
      modalIn: false
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.getRepoData = this.getRepoData.bind(this);
    this.viewRepoDetail = this.viewRepoDetail.bind(this);
  }

  // use state data to query github api and update state data to update view
  getRepoData(search) {
    axios
      .get(`https://api.github.com/search/repositories?q=${search}+in:name`)
      .then(res => {
        const data = res.data.items;

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

  render() {
    return (
      <div>
        <h2>Search Github Repo's</h2>

        <SearchForm
          getRepoData={this.getRepoData}
        />

        <SearchResults
          githubData={this.state.githubData}
          viewRepoDetail={this.viewRepoDetail}
        />

        <RepoModal
          modalIn={this.state.modalIn}
          handleCloseModal={this.handleCloseModal}
          currentRepo={this.state.currentRepo}
          currentReadme={this.state.currentReadme}
        />
      </div>
    );
  }
}

export default SearchGithub;