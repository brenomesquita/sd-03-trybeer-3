import React from 'react';
import { useHistory } from 'react-router-dom';
import bigBangBeerLogo from '../assets/images/bigBangBeerLogo.gif';

const redirect = (history, pathName) => {
  if (pathName == null) {
    localStorage.setItem('user', JSON.stringify({}));
    return history.push('/login');
  }
  return history.push(`/${pathName}`);
};

function SideMenuAdmin() {
  const history = useHistory();
  return (
    <div className="Landing-Page">
      <header className="header">
        <img src={ bigBangBeerLogo } alt="bing bang beer logo" className="logo-landing-page" />
        <small className="header-sub-title">O SEU DELIVERY DE BEBIDAS</small>
        <span className="header-options">
          <button className="options-btn" data-testid="side-menu-item-orders" onClick={ () => redirect(history, 'admin/orders') }>
            Pedidos
          </button>
          <button className="options-btn" data-testid="side-menu-item-profile" onClick={ () => redirect(history, 'admin/profile') }>
            Perfil
          </button>
          <button className="options-btn" data-testid="side-menu-item-logout" onClick={ () => redirect(history, null) }>
            Sair
          </button>
        </span>
      </header>
    </div>
  );
}

export default SideMenuAdmin;
