import { useEffect, useState } from 'react';

import Login from '../../index';

import logo from '../../../../assets/images/logo.svg';

import { Container } from './style';

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Container fadeOut={isLoading}>
          <img src={logo} alt="logo-waiterapp" />
        </Container>
      ) : (
        <Login />
      )}
    </>
  );
}
