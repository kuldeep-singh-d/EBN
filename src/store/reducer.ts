import { combineReducers } from 'redux';

// global states
import appTheme from './slices/app/localStates/appTheme';
import loginState from './slices/app/localStates/loginState';
import handalLoading from './slices/app/localStates/handalLoading';

// API States
import login from './slices/auth/login';
import logout from './slices/auth/logout';
import dashboard from './slices/app/dashboard/dashboard';
import dropdowns from './slices/app/dropdowns/dropdowns';
import eliteMeets from './slices/app/eliteMeets/eliteMeets';
import eliteMembers from './slices/app/eliteMembers/eliteMembers';
import profile from './slices/app/profile/profile';
import payments from './slices/app/payments/payments';
import deviceToken from './slices/app/notifications/deviceToken';
import trainings from './slices/app/trainings/trainings';
import eliteReferrals from './slices/app/eliteReferrals/eliteReferrals';
import eliteCloseBusiness from './slices/app/eliteCloseBusiness/eliteCloseBusiness';
import visitorInvitations from './slices/app/visitorInvitations/visitorInvitations';

const reducers = combineReducers({
  appTheme,
  loginState,
  handalLoading,
  login,
  logout,
  dashboard,
  dropdowns,
  eliteMeets,
  eliteMembers,
  profile,
  payments,
  deviceToken,
  trainings,
  eliteReferrals,
  eliteCloseBusiness,
  visitorInvitations,
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
