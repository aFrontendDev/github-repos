import React, { Component } from 'react';

import '../../Components/search-form/search-form.css';

class SearchForm extends Component {

  constructor() {
    super();

    this.state = {
      searchTerm: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // on input change update state
  handleInputChange(event) {
    const _Target = event.target;
    const targetVal = _Target.value;

    this.setState({
      searchTerm: targetVal
    });
  }

  // handle form submit event to search github api for repos
  handleSubmit(event) {
    event.preventDefault();
    this.props.getRepoData(this.state.searchTerm);
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form__input-container">
            <label htmlFor="searchTerm">
              Repo Name:
            </label>
            <input
              name="searchTerm"
              type="text"
              value={this.state.searchTerm}
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

SearchForm.propTypes = {
    getRepoData: React.PropTypes.func.isRequired
}

export default SearchForm;