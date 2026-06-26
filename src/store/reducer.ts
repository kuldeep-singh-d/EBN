import { combineReducers } from 'redux';

// global states
import appTheme from './slices/localStates/appTheme';
import loginState from './slices/localStates/loginState';
import handalLoading from './slices/localStates/handalLoading';

// API States

const reducers = combineReducers({
  appTheme,
  loginState,
  handalLoading,
});

// Reset user-scoped Redux state when the active login is cleared.
const rootReducer = (state: any, action: any) => {
  if (action.type === 'login/reset') {
    state = {
      appTheme: state?.appTheme,
      loginState: state?.loginState,
    };
  }
  return reducers(state, action);
};

export default rootReducer;
