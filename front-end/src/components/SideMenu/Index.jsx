import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

const test = (history, pathName) => {
  if (pathName == null) {
    localStorage.setItem('user', JSON.stringify({}));
    return history.push('/login');
  }
  return history.push(`/${pathName}`);
};

function SideMenu(sideMenuState) {
  const history = useHistory();
  const location = window.location.pathname;
  return (
    sideMenuState
        &&
        <div className="side-menu-container">
          <div className="nav__list">
            <button className={ location === '/products' ? 'not__nav__link' : 'nav__link' } data-testid="side-menu-item-products" onClick={ () => test(history, 'products') }>
              <span className="nav__name">Produtos</span>
            </button>
            <button className={ location === '/orders' ? 'not__nav__link' : 'nav__link' } data-testid="side-menu-item-my-orders" onClick={ () => test(history, 'orders') }>
              <span className="nav__name">Meus Pedidos</span>
            </button>
            <button className={ location === '/profile' ? 'not__nav__link' : 'nav__link' } data-testid="side-menu-item-my-profile" onClick={ () => test(history, 'profile') }>
              <span className="nav__name">Meu Perfil</span>
            </button>
            <button className="nav__link" data-testid="side-menu-item-logout" onClick={ () => test(history, null) }>
              <span className="nav__name">Sair</span>
            </button>
          </div>
        </div>
  );
}

export default SideMenu;
