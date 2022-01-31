import Cookies from 'js-cookie';
import { createGlobalState } from 'react-hooks-global-state';

export const {
  GlobalStateProvider,
  useGlobalState,
  getGlobalState,
  setGlobalState,
} = createGlobalState({
  authUser: Cookies.get('authUser') || null,
});
