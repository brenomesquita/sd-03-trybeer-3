import React, { useState, useEffect } from 'react';
import SideMenuAdmin from '../../components/SideMenuAdmin';
import Loading from '../../components/Loading/Index';

const nameInput = (name) => (
  <div>
    <h4>Nome: </h4>
    <h4 data-testid="profile-name">{name}</h4>
  </div>
);

const emailInput = (email) => (
  <div>
    <h4>Email: </h4>
    <h4 data-testid="profile-email">{email}</h4>
  </div>
);

function AdminProfile() {
  const [name, setName] = useState('');
  const [email, setEMail] = useState('');

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if (!actualUser) return window.location.assign('http://localhost:3000/login');
    setName(actualUser.data.name);
    return setEMail(actualUser.data.email);
  }, []);

  return (
    <div>
      {name === '' && <Loading />}
      {SideMenuAdmin()}
      <div className="checkout-container">
        <h2>Perfil</h2>
        {nameInput(name)}
        {emailInput(email)}
      </div>
    </div>
  );
}

export default AdminProfile;
