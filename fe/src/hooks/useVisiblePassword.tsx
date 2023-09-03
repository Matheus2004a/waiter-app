import { useCallback, useState } from 'react';

import eyeHidden from '../assets/images/eye-hidden.svg';
import eye from '../assets/images/eye.svg';

export default function useVisiblePassword() {
  const [visiblePassword, setVisiblePassword] = useState('password');

  const handleVisiblePassword = useCallback(() => {
    setVisiblePassword((prevState) => prevState === 'password' ? 'text' : 'password');
  }, []);

  const eyeStatus = visiblePassword === 'text'
    ? <img src={eyeHidden} alt="icon-eye-hidden" />
    : <img src={eye} alt="icon-eye" />;

  return {
    visiblePassword,
    eyeStatus,
    handleVisiblePassword
  };
}
