import {useState} from 'react';

const api_url = `https://movie-api-app.jgb.solutions`;

function FetchMoviesService() {
  const [moviesCollection, setMoviesCollection] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [canLoadMoreFeed, setCanLoadMoreFeed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState(undefined);
  const [lastSearchedKey, updateLastSearchedKey] = useState('');

  const fetchMoviesFeed = async () => {
    setIsFetchingData(true);
    if (searchKey !== lastSearchedKey) {
      setCurrentPage(1);
      setMoviesCollection([]);
    }

    try {
      const response = await fetch(
        `${api_url}/search/${searchKey}/?page=${currentPage}`
      );
      const responseBody = await response.json();
      const fetchedMoviesCollection = responseBody.Search;
      const totalResults = parseInt(responseBody.totalResults);
      setIsFetchingData(false);

      if (searchKey === lastSearchedKey) {
        setMoviesCollection(
          prevMoviesCollection => [
            ...prevMoviesCollection,
            ...fetchedMoviesCollection]
        );
      } else {
        setMoviesCollection([...fetchedMoviesCollection]);
        updateLastSearchedKey(searchKey);
      }

      if (totalResults - (page * 10) > 0) {
        setCanLoadMoreFeed(true);
        setCurrentPage(prevPage => ++prevPage)
      } else {
        setCanLoadMoreFeed(false);
        setCurrentPage(1)
      }
    } catch (error) {
      console.error(error);
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
      if (searchKey)
        fetchMoviesFeed();
    }, [searchKay]
  );

  return [
    moviesCollection,
    setSearchKey,
    isFetchingData,
    canLoadMoreFeed,
    fetchMoviesFeed,
    lastSearchTerm,
    setMovies,
  ];
}

export default FetchMoviesService;
