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
    return (

      <modal className={"modal " + (this.props.modalIn ? 'modal--in' : '')}>
        <button className="modal__close" onClick={this.props.handleCloseModal}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
          </svg>
          <span className="visually-hidden">Close</span>
        </button>

        <div className="modal__inner">
          {
            this.props.currentRepo ?
              <div>
                <h4>{this.props.currentRepo.name}</h4>
                <a href={this.props.currentRepo.url}>{this.props.currentRepo.url}</a>
                <ul>
                  <li>{this.props.currentRepo.full_name}</li>
                  <li>{this.props.currentRepo.language}</li>
                  <li>{this.props.currentRepo.created_at}</li>
                  <li>{this.props.currentRepo.owner.login}</li>
                </ul>
              </div>
            : null
          }

          {
            this.props.currentReadme ?
              <div className="readme" dangerouslySetInnerHTML={this.createMarkup()} />
            : null
          }
        </div>
      </modal>

    );
  }
}

RepoModal.propTypes = {
    modalIn: React.PropTypes.bool.isRequired,
    handleCloseModal: React.PropTypes.func.isRequired,
    currentRepo: React.PropTypes.object,
    currentReadme: React.PropTypes.string
}

export default RepoModal;