import Cookies from 'js-cookie';
import { setGlobalState } from '../App.state';

export function logout() {
  setGlobalState('authUser', null);

  Cookies.remove('authUser', { path: '/' });
}
