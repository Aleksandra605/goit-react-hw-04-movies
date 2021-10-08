import { getCast } from '../../services/moviesdbApi';
import { useEffect, useState } from 'react';
import s from './additional-style.module.css';
import PropTypes from 'prop-types';

export default function Cast({ code }) {
  const [actors, setActors] = useState();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (code) {
      setStatus('pending');
      getCast(code).then(data => {
        setActors(data);
        setStatus('resolved');
      });
    }
    return () => {
      setActors(null);
    };
  }, [code]);

  return (
    <div>
      {status === 'resolved' && (
        <ul className={s.actorsList}>
          {actors.map(actor => (
            <li key={actor.id} className={s.actor}>
              <div>
                <img
                  alt={actor.name}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  width="150px"
                />
              </div>
              <h5 className={s.actorName}>{actor.name}</h5>
              <p className={s.character}>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Cast.propTypes = {
  code: PropTypes.number,
};
