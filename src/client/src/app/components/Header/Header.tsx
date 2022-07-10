import './Header.scss';
import Menu from '@components/menus/Menu/Menu';

function Header() {
    return (
        <header className="header mb-5">
          <div className="container">
            <Menu />
          </div>
        </header>
    )
}

export default Header;