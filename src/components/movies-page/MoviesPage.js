import { useState, useEffect } from 'react';
import SearchMovie from './SearchMovie';
import { getMoviesByQuery } from '../../services/moviesdbApi';
import MoviesList from '../movies-page/MoviesList';
import Loader from 'react-loader-spinner';
import { useLocation, useHistory } from 'react-router-dom';

export default function MoviesPage() {
  const [movie, setMovie] = useState(null);
  const [foundMovies, setFoundMovies] = useState(null);
  const [status, setStatus] = useState('idle');

  const location = useLocation();
  let history = useHistory();

  const getMovie = data => {
    return setMovie(data);
  };

  useEffect(() => {
    if (movie) {
      history.push({
        ...location,
        search: `query=${movie}`,
      });

      setStatus('pending');
      return getMoviesByQuery(movie)
        .then(data => {
          if (data.length > 0) {
            let moviesList = data.slice(0, 10);
            setFoundMovies(moviesList);
            setStatus('resolved');
          } else throw new Error('No results were found for your search.');
        })
        .catch(error => {
          setStatus('rejected');
          alert(error);
        });
    }
  }, [movie]);

  useEffect(() => {
    if (history.location.search === '') {
      return history.push('/movies');
    }
    const prevMovie = new URLSearchParams(history.location.search).get('query');
    return setMovie(prevMovie);
  }, [history]);

  return (
    <div>
      <SearchMovie onSubmit={getMovie} />
      {status === 'pending' && (
        <div>
          <Loader
            type="MutatingDots"
            color="#0b6470"
            secondaryColor="rgb(72, 163, 185)"
            height={100}
            width={100}
          />
        </div>
      )}
      {foundMovies && <MoviesList data={foundMovies} />}
    </div>
  );
}
