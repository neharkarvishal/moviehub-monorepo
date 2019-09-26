import React from "react";
import FetchMoviesService from "./FetchMoviesService";
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
    }
    else {
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
    </div>
  );
}

export default MoviesRepository;
