import './App.css';
import Navigation from './components/navigation/Navigation';
import { Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() =>
  import('./components/home-page/HomePage' /* webpackChunkName: "HomePage" */),
);

const MoviesPage = lazy(() =>
  import(
    './components/movies-page/MoviesPage' /* webpackChunkName: "MoviesPage" */
  ),
);

const MovieDescr = lazy(() =>
  import(
    './components/movie-description/MovieDescr' /* webpackChunkName: "MovieDescr" */
  ),
);

function App() {
  return (
    <div>
      <Navigation />
      <Suspense
        fallback={
          <div>
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
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/movies/:movieID">
            <MovieDescr />
          </Route>

          <Route exact path="/movies">
            <MoviesPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
