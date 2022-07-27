import './Header.scss';
import Menu from '@components/menus/Menu/Menu';
import HeaderAuth from '@components/Header/HeaderAuth/HeaderAuth';

function Header() {

  return (
    <header className="header mb-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          <Menu />
          <HeaderAuth />
        </div>
      </div>
    </header>
  )
}

export default Header;