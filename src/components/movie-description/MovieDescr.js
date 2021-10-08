import s from './movie-descr.module.css';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { getMovieById } from '../../services/moviesdbApi';
import { useState, useEffect, lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';

const Cast = lazy(() =>
  import('../additional/Cast' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('../additional/Reviews' /* webpackChunkName: "Reviews" */),
);

export default function MovieDescr() {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('idle');

  const { url } = useRouteMatch();
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (params) {
      setStatus('pending');
      getMovieById(params.movieID)
        .then(response => {
          if (!response) {
            return new Error('Ooops... Something wrong((');
          } else setDescription(response);
          setStatus('resolved');
          console.log(location);
        })
        .catch(error => {
          setStatus('rejected');
        });
    } // eslint-disable-next-line
  }, [params]);

  const onGoBack = () => {
    // console.log(location);
    history.push(location?.state?.from ?? '/');
  };

  const { title, poster_path, overview, genres, id } = description;

  return (
    <section className={s.sectionMovieDescr}>
      <button type="button" onClick={onGoBack} className={s.btnGoBack}>
        Назад
      </button>
      {status === 'resolved' && (
        <div className={s.movieContainer}>
          <img
            alt={title}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            width="200px"
          />
          <div className={s.description}>
            <h3 className={s.title}>{description.title}</h3>
            <p></p>
            <h4 className={s.h4}>Overview</h4>
            <p className={s.overview}>{overview}</p>
            <h4 className={s.h4}>Genres</h4>
            <p className={s.genres}>{genres.map(genre => genre.name + ' ')}</p>
          </div>
        </div>
      )}
      <hr />
      {status === 'resolved' && (
        <div className={s.additional}>
          <h4>Additional information</h4>
          <ul className={s.descrList}>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location },
                }}
                className={s.cast}
                exact
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location },
                }}
                className={s.reviews}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <hr />
      <Suspense
        fallback={
          <div className={s.divLoader}>
            <Loader
              type="MutatingDots"
              color="#0b6470"
              secondaryColor="rgb(72, 163, 185)"
              height={100}
              width={100}
            />
          </div>
        }
      >
        <Route path={`${url}/cast`} exact>
          <Cast code={id} />
        </Route>

        <Route path={`${url}/reviews`} exact>
          <Reviews code={id} />
        </Route>
      </Suspense>
    </section>
  );
}
