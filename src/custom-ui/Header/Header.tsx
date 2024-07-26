import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import logo from '../../assets/logo.svg';
import smallLogo from '../../assets/small-logo.png';
import SearchForm from './SearchForm';
import Profile from './Profile';
import Notification from './Notification';
import { RiMenu5Fill as MenuIcon } from "react-icons/ri";
import { LiaTimesSolid as CancelIcon} from "react-icons/lia";

const Header = ({set_show_menu,show_menu}:any) => {
  return (
    <header className={styles.container}>
      <button className={show_menu?styles.show:''} onClick={()=>set_show_menu((show:boolean) => !show)}>
        <MenuIcon />
        <CancelIcon />
      </button>
      <NavLink to='/dashboard'>
        <img src={smallLogo} alt="logo" height="20px" />
        <img src={logo} alt="logo" height="30px" />
      </NavLink>
      <nav>
        <SearchForm />
        <div data-testid="test-doc-div">
          <NavLink to="/docs">Docs</NavLink>
          <Notification />
          <Profile />
        </div>
      </nav>
    </header>
  )
}

export default Header;