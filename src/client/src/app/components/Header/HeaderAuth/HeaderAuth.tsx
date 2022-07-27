import { NavLink } from "react-router-dom";
import { useAppSelector } from '@store/hooks';
import { userData } from '@store/features/auth/auth';
import HeaderLogOut from '@components/Header/HeaderLogOut/HeaderLogOut';

const HeaderAuth = () => {
  const user = useAppSelector(userData);
  return(
    <div className="d-flex align-items-center">
      {
        !user &&
        <NavLink to="/auth/sign-up" className="btn btn-secondary me-2">sign up</NavLink>
      }
      {
        !user &&
        <NavLink to="/auth/sign-in" className="btn btn-primary">sign in</NavLink>
      }
      {
        user &&
        <NavLink to="/personal" className="nav-link">{ user.name }</NavLink>
      }
      { user && <HeaderLogOut /> }
    </div>
  )
}

export default HeaderAuth;