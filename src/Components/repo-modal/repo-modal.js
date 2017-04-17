import React, { Component } from 'react';

import '../../Components/repo-modal/repo-modal.css';

class RepoModal extends Component {

  constructor() {
    super();

    this.createMarkup = this.createMarkup.bind(this);
  }

  // convert html string to html
  createMarkup() {
    return {__html: this.props.currentReadme};
  }

  render() {
    const repo = this.props.currentRepo;
    let created = repo ? repo.created_at.substring(0, repo.created_at.indexOf('T')) : null;
    let updated = repo ? repo.updated_at.substring(0, repo.updated_at.indexOf('T')) : null;
    
    return (

      <modal className={"modal " + (this.props.modalIn ? 'modal--in' : '')}>
        <button className="modal__close" onClick={this.props.modalOut}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
          </svg>
          <span className="visually-hidden">Close</span>
        </button>

        <div className="modal__inner">
          <result className="result result--style-b">
          {
            repo ?
              <div className="result__inner">
                <h2 className="result__title"><a href={repo.html_url} target="_blank">{repo.name}</a></h2>
                <div className="result__body">
                  <div className="result__detail">
                    {
                      repo.description ?
                      <p className="result__description">{repo.description}</p>
                      : null
                    }
                    <ul>
                      <li><strong>Owner</strong>: <a href={repo.owner.html_url} target="_blank">{repo.owner.login}</a></li>
                      <li><strong>Created</strong>: {created}</li>
                      <li><strong>Last Updated</strong>: {updated}</li>
                      {repo.open_issues_count ? <li><strong>Open Issues</strong>: {repo.open_issues_count}</li> : null}
                      {repo.forks ? <li><strong>Forks</strong>: {repo.forks}</li> : null}
                      {repo.watchers ? <li><strong>Watchers</strong>: {repo.watchers}</li> : null}
                      {repo.language ? <li><strong>Language</strong>: {repo.language}</li> : null}
                      {repo.git_url ? <li><strong>Git Url</strong>: {repo.git_url}</li> : null}
                      {repo.shh_url ? <li><strong>SSH Url</strong>: {repo.shh_url}</li> : null}
                      {repo.clone_url ? <li><strong>Clone Url</strong>: {repo.clone_url}</li> : null}
                      <li><strong>Repo Url</strong>: <a href={repo.html_url} target="_blank">{repo.html_url}</a></li>
                    </ul>
                  </div>
                  <figure className="result__avatar">
                    <a href={repo.owner.html_url} target="_blank">
                      <img src={repo.owner.avatar_url} alt="user avatar" />
                    </a>
                  </figure>
                </div>
              </div>
            : null
          }

          {
            this.props.currentReadme ?
              <div className="result__readme">
                <h3 className="result__readme-title">Repository Readme</h3>
                <article dangerouslySetInnerHTML={this.createMarkup()} />
              </div>
            : null
          }
          </result>
        </div>
      </modal>

    );
  }
}

RepoModal.propTypes = {
    modalIn: React.PropTypes.bool.isRequired,
    modalOut: React.PropTypes.func.isRequired,
    currentRepo: React.PropTypes.object,
    currentReadme: React.PropTypes.string
}

export default RepoModal;