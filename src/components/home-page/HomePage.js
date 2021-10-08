import { getTrendingMovies } from '../../services/moviesdbApi';
import { useState, useEffect } from 'react';
import s from './home-page.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function HomePage() {
  const [films, setFilms] = useState(null);
  const location = useLocation();

  useEffect(() => {
    return getTrendingMovies().then(data => {
      return setFilms(data);
    });
  }, []);

  return (
    <div className={s.container}>
      <h3>Trending movies</h3>
      {films && (
        <ul className={s.list}>
          {films.map(film => (
            <li key={film.id}>
              <Link
                to={{
                  pathname: `/movies/${film.id}`,
                  state: { from: location },
                }}
              >
                {film.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
