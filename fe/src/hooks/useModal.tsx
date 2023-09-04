import { useContext } from 'react';
import { UserContext } from '../contexts/Modal/UserContext';

export default function useModal() {
  return useContext(UserContext);
}
