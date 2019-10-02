import React from "react";
import { get } from "lodash";
import logo from "../logo.svg";

import Card from "../components/Card";
import Form from "../components/Form";
import Header from "../components/Header";
import Button from "../components/Button";
import NoMoviesFound from "../components/NoMoviesFound"

import FetchMoviesService from "../services/FetchMoviesService";

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

  const search = (event) => {
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
        onChange={search}
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
          <NoMoviesFound />
        ) : null}
      </div>

      {!!moviesCollection.length && canLoadMoreFeed && (
        <Button  text={"Load More"} onClick={fetchMoviesFeed} />
      )}
      <br />
      <br />
      <br />
    </div>
  );
}

export default MoviesRepository;
