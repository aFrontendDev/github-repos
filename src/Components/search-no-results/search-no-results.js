import React, { Component } from 'react';

class SearchNoResults extends Component {

  render() {
    
    return (

        <section className="results">
          <header className="results__header">
            <h3 className="results__title">We couldn't find any results</h3>
          </header>
        </section>

    );
  }
}

export default SearchNoResults;