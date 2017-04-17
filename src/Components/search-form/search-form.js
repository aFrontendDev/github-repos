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
      <div className="search__form">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="search__input-container">
            <label htmlFor="searchTerm">
              Repo Name:
            </label>

            <span className="search__input-with-btn">
              <input
                name="searchTerm"
                type="text"
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                className="input--xxlarge"
                placeholder="e.g. React"
              />
              <button className="btn search__input-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"/>
                </svg>
                <span className="visually-hidden">Search</span>
              </button>
            </span>
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