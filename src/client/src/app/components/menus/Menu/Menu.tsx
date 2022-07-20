import { NavLink } from "react-router-dom";

import './Menu.scss';

const Menu = () => {
  return(
    <div className="menu">
      <nav className="nav">
        <NavLink to="/" className="nav-link">main</NavLink>
        <NavLink to="/auth/sign-up" className="nav-link">sign up</NavLink>
        <NavLink to="/auth/sign-in" className="nav-link">sign in</NavLink>
      </nav>
    </div>

  )
}

export default Menu;