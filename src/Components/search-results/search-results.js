import React, { Component } from 'react';

import '../../Components/search-results/search-results.css';

class SearchResults extends Component {

  render() {
    const plural = this.props.numberOfResults > 1 ? true : false;
    let resultText = plural ? 'results found' : 'result found';
    return (

      <div>

        {
          this.props.githubData.length > 0 ?
          <section className="results">
            <header className="results__header">
              <h3 className="results__title">Search Results</h3>
              <p className="results__amount">
                {
                  `${this.props.numberOfResults} ${resultText}`
                }
              </p>
              </header>
            <div className="results__body">
            {
              this.props.githubData.map(function(repo) {
                let itemClick = this.props.viewRepoDetail.bind(this, repo);
                const created = repo.created_at.substring(0, repo.created_at.indexOf('T'));

                return (
                  <result key={repo.id} className="result result--style-a" onClick={itemClick}>
                    <div className="result__inner">
                      <h4 className="result__title">{repo.name}</h4>
                      <div className="result__body">
                        <div className="result__detail">
                          {
                            repo.description ?
                            <p className="result__description">{repo.description}</p>
                            : null
                          }
                          <ul>
                            <li><strong>Owner</strong>: {repo.owner.login}</li>
                            <li><strong>Created</strong>: {created}</li>
                          </ul>
                        </div>
                        <figure className="result__avatar">
                          <img src={repo.owner.avatar_url} alt="user avatar" />
                        </figure>
                      </div>
                    </div>
                  </result>
                );
              }, this)
            }
            </div>
          </section>

          : null
        }

      </div>
    );
  }
}

SearchResults.propTypes = {
    githubData: React.PropTypes.array.isRequired,
    viewRepoDetail: React.PropTypes.func.isRequired,
    numberOfResults: React.PropTypes.number.isRequired
}

export default SearchResults;