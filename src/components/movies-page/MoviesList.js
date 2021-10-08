import s from './movies-page.module.css';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';

export default function MoviesList({ data }) {
  // const [list, setList] = useState(data);

  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <ul className={s.moviesList}>
      {data.map(item => (
        <li className={s.listItem} key={item.id}>
          <Link
            to={{ pathname: `${url}/${item.id}`, state: { from: location } }}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

MoviesList.propTypes = {
  data: PropTypes.array,
};
