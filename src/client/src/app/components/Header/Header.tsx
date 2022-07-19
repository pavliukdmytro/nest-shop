import './Header.scss';
import Menu from '@components/menus/Menu/Menu';
import { useAppSelector } from '@store/hooks';
import { userData } from '@store/features/auth/auth';

function Header() {

  const user = useAppSelector(userData);

  return (
    <header className="header mb-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Menu />
          <div>
            { user ? user.name : '' }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;