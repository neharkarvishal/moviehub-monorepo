import React from "react";
import FetchMoviesService from "./FetchMoviesService";
import { get } from 'lodash';
import Header from "./Header";
import logo from "./logo.svg";

let debounceSearch;

function MoviesRepository() {
  const [
    moviesCollection,
    setSearchKey,
    isFetchingData,
    canLoadMoreFeed,
    fetchMoviesFeed,
    lastSearchedKey,
    setMoviesCollection
  ] = FetchMoviesService();

  const search = event => {
    const searchKey = event.target.value.trim();
    if (searchKey > 2) {
      clearTimeout(debounceSearch);
      debounceSearch = setTimeout(() => {
        setSearchKey(searchKey);
      }, 500);
    } else {
      setMoviesCollection([]);
    }
  };
  return (
    <div>
      <Header logo={logo} text={"Moviehub"} />
      <form>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search any movie, series or TV Shows"
            onChange={search}
          />
        </div>
      </form>
      <br />
      {isFetchingData && <h2>Loading...</h2>}
      <div className="row">
        {moviesCollection.length ? (
          moviesCollection.map(movie => {
            const title = get(movie, "Title", `No Title`);
            const movieId = get(movie, "imdbID");
            let poster = get(movie, "Poster");
            if (!poster || poster === "N/A") {
              poster = `https://dummyimage.com/300x448/2c96c7/ffffff.png&text=No+Image`;
            }
            const type = get(movie, "Type", `undefined`);
            const year = get(movie, "Year", `undefined`);

            return (
              <div key={movieId} className="col-sm-6 mb-3">
                <div className="row">
                  <div className="col-7">
                    <img src={poster} alt={title} className="img-fluid" />
                  </div>
                  <div className="col-5">
                    <h3 className="movie-title">{title}</h3>
                    <p>
                      Type: {type}.<br /> Year: {year}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : lastSearchedKey.length > 2 ? (
          <div className="col-12">
            <h2>No Movies Found</h2>
          </div>
        ) : null}
      </div>
      {!!moviesCollection.length && canLoadMoreFeed && (
        <button
          className="btn btn-primary btn-large btn-block"
          onClick={fetchMoviesFeed}
        >
          Load More
        </button>
      )}
      <br />
      <br />
      <br />
    </div>
  );
}

export default MoviesRepository;
