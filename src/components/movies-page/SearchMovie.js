import { useState } from 'react';
import s from './movies-page.module.css';
import PropTypes from 'prop-types';

export default function SearchMovie({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setValue(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      alert('Enter a word');
      return;
    }
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        name="name"
        className={s.input}
        onChange={handleChange}
        type="text"
        autoComplete="off"
        autoFocus
        value={value}
      ></input>
      <button type="submit" className={s.buttonSubmit}>
        Search
      </button>
    </form>
  );
}

SearchMovie.propTypes = {
  onSubmit: PropTypes.func,
};
