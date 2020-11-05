import React from 'react';
import { useHistory } from 'react-router-dom';
import bigBangBeerLogo from '../../assets/images/bigBangBeerLogo.gif';
import tableslogan from '../../assets/images/tableslogan.jpg';
import createicon from '../../assets/images/createicon.png';
import topicon from '../../assets/images/topicon.png';
import cheersicon from '../../assets/images/cheersicon.png';

import './styles.css';

const enterButton = (clickToEnter) => (
  <div>
    <button
      className="signin-btn"
      onClick={ () => clickToEnter() }
    >
      ENTRAR
    </button>
  </div>
);

const registerButton = (history) => (
  <div>
    <button
      type="button"
      className="no-account-btn"
      data-testid="no-account-btn"
      onClick={ () => history.push('/register') }
    >
      Ainda não tenho conta
    </button>
  </div>
);

function LandingPage() {
  const history = useHistory();

  const clickToEnter = async () => {
    history.push('/login');
  };

  return (
    <div className="Landing-Page">
      <header className="header">
        <img src={ bigBangBeerLogo } alt="bing bang beer logo" className="logo-landing-page" />
        <small className="header-sub-title">O SEU DELIVERY DE BEBIDAS</small>
        <span className="header-options">
          {enterButton(clickToEnter)}
          {registerButton(history)}
        </span>
      </header>
      <body>
        <section>
          <img src={ tableslogan } alt="bing bang beer logo" className="img-slogan" />
          <h1 className="tittle-slogan">
            Tenha uma
            {' '}
            <strong>explosão</strong>
            {' '}
            de sabores na sua mesa
            {' '}
            <strong>agora</strong>
            .
          </h1>
        </section>
        <section className="description">
          <h1 className="tittle-description">Como funciona o Big Bang Beer?</h1>
          <span>
            <img src={ createicon } alt="create acount icon" className="icons" />
            <h1 className="tittle-description">1- Crie Sua Conta</h1>
            <p className="sub-tittle-description">Crie sua conta grátis e peça sua bebida gelada de qualquer lugar</p>
          </span>
          <span>
            <img src={ topicon } alt="bing bang beer logo" className="icons" />
            <h1 className="tittle-description">2- Só as melhores</h1>
            <p className="sub-tittle-description">Aqui você encontra suas bebidas preferidas geladinhas</p>
          </span>
          <span>
            <img src={ cheersicon } alt="bing bang beer logo" className="icons" />
            <h1 className="tittle-description">3- Festeje!!</h1>
            <p className="sub-tittle-description">Suas bebidas chegam geladinhas e super rápidas, para você e seus amigos 🍻🎊</p>
          </span>
        </section>
      </body>
    </div>
  );
}

export default LandingPage;
