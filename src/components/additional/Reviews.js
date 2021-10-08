import { getReviews } from '../../services/moviesdbApi';
import { useEffect, useState } from 'react';
import s from './additional-style.module.css';
import PropTypes from 'prop-types';

export default function Reviews({ code }) {
  const [review, setReview] = useState();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (code) {
      setStatus('pending');

      getReviews(code)
        .then(data => {
          if (data.length > 0) {
            setReview(data);
            setStatus('resolved');
          } else throw new Error('No reviews');
        })
        .catch(error => setStatus('rejected'));
    }

    return () => {
      setReview(null);
    };
  }, [code]);

  return (
    <div>
      {status === 'rejected' && <p>We don't have any reviews for this movie</p>}
      {status === 'resolved' && (
        <ul className={s.reviewsList}>
          {review.map(item => (
            <li key={item.author}>
              <h5 className={s.authorName}>{item.author}</h5>
              <p className={s.content}>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Reviews.propTypes = {
  code: PropTypes.number,
};
