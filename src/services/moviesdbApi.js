import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzJjNzI2MjA1NDMwMDNjYWNlOGYyNzUxYTZkOTUyZCIsInN1YiI6IjYxMDE3YzQzZjA2NDdjMDAzMGQ3OTAyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v0sc8G2tdC_1e3d41ZJq84e6Q6-I1zY7nm_cyuzi7rk';

const handleFetch = function (response) {
  return response
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.response.data.status_message);
    })
    .finally(function () {
      return;
    });
};

const getTrendingMovies = function (page = 1) {
  return handleFetch(axios.get(`/trending/movie/week?page=${page}`)).then(
    res => res.results,
  );
};

const getMoviesByQuery = function (query) {
  return handleFetch(axios.get(`/search/movie?&query=${query}`)).then(
    res => res.results,
  );
};

const getMovieById = function (id) {
  return handleFetch(axios.get(`/movie/${id}`));
};

const getCast = function (id) {
  return handleFetch(axios.get(`/movie/${id}/credits`)).then(
    response => response.cast,
  );
};

const getReviews = function (id) {
  return handleFetch(axios.get(`/movie/${id}/reviews`)).then(
    response => response.results,
  );
};

export {
  getTrendingMovies,
  getMoviesByQuery,
  getMovieById,
  getCast,
  getReviews,
};
