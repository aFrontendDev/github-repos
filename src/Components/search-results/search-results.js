import React, { Component } from 'react';

import '../../Components/search-results/search-results.css';

class SearchResults extends Component {

  render() {
    return (

      <section className="results">
        <header className="results__header">
        <h3 className="results__title">Search Results</h3>
        </header>
        <div className="results__body">
        {
          this.props.githubData.map(function(repo) {
          let itemClick = this.props.viewRepoDetail.bind(this, repo);
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
    );
  }
}

SearchResults.propTypes = {
    githubData: React.PropTypes.array.isRequired,
    viewRepoDetail: React.PropTypes.func.isRequired
}

export default SearchResults;