import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import logo from '../../assets/logo.svg';
import smallLogo from '../../assets/small-logo.png';
import SearchForm from './SearchForm';
import Profile from './Profile';
import Notification from './Notification';

const Header = () => {
  return (
    <header className={styles.container}>
      <NavLink to='/dashboard'>
        <img src={smallLogo} alt="logo" height="20px" />
        <img src={logo} alt="logo" height="30px" />
      </NavLink>
      <nav>
        <SearchForm />
        <div>
          <NavLink to="/docs">Docs</NavLink>
          <Notification />
          <Profile />
        </div>
      </nav>
    </header>
  )
}

export default Header;