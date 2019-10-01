import React from "react";
import FetchMoviesService from "./FetchMoviesService";
import { get } from "lodash";
import Header from "./Header";
import Button from "./Button";
import Card from "./Card";
import logo from "./logo.svg";
import Form from "./Form";

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

    if (searchKey.length > 2) {
      clearTimeout(debounceSearch);
      debounceSearch = setTimeout(() => {
        setSearchKey(searchKey);
      }, 500);
    } else {
      setMoviesCollection([]);
    }
  };
  return (
    <div className="col-sm-8 offset-sm-2">
      <Header logo={logo} text={"Moviehub"} />
      <Form
        placeholder={"Search any movie, series or TV Shows"}
        onChange={() => search}
      />
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
              <Card
                key={movieId}
                poster={poster}
                title={title}
                type={type}
                year={year}
              />
            );
          })
        ) : lastSearchedKey.length > 2 ? (
          <div className="col-12">
            <h2>No Movies Found</h2>
          </div>
        ) : null}
      </div>

      {!!moviesCollection.length && canLoadMoreFeed && (
        <Button onClick={() => fetchMoviesFeed} text={"Load More"} />
      )}
      <br />
      <br />
      <br />
    </div>
  );
}

export default MoviesRepository;
