import React from 'react';
import Login from './Login';
import { useStoreState } from 'easy-peasy';

const Header = () => {
  const userName = useStoreState((state) => state.userName)

  return (
    <header className='Header'>
        <h1>{ userName ? `Hi! ${userName}~` : 'Read CSV File'}</h1>
        <Login/>
    </header>
  );
}

export default Header;
