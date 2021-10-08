import { NavLink } from 'react-router-dom';
import s from './navigation.module.css';

const Navigation = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <NavLink exact to="/" className={s.home}>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.movies}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
