import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from '@hooks';
import { show } from '@utils/helpers';
import { routes } from '@navigation/routes';
import { setLoginState } from '@store/slices/app/localStates/loginState';
import {
  LoginResponse,
  login as loginRequest,
} from '@store/slices/auth/login';
import { LoginCredentials } from './types';
import useStyles from './styles';

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const useLogin = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const loader = useSelector(state => Boolean(state.login?.loading));
  const loginResponse = useSelector(
    state => state.login?.data,
  ) as LoginResponse | undefined;
  const loginError = useSelector(state => state.login?.error);
  const submittedRef = useRef(false);

  const [email, setEmail] = useState<LoginCredentials['email']>('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState<LoginCredentials['password']>('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (!submittedRef.current || !loginResponse) return;

    const isSuccess =
      loginResponse.status === 'success' || loginResponse.success === true;
    const message = loginResponse.message;

    submittedRef.current = false;

    if (isSuccess && loginResponse.data?.token) {
      show.success(message || 'Login successful.');
      dispatch(setLoginState(true));
      return;
    }

    show.error(message || 'Unable to login. Please try again.');
  }, [dispatch, loginResponse]);

  useEffect(() => {
    if (submittedRef.current && loginError) {
      submittedRef.current = false;
    }
  }, [loginError]);

  const handleLogin = useCallback(() => {
    let hasError = false;
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setEmailError('Username is required');
      hasError = true;
    } else if (!isValidEmail(normalizedEmail)) {
      setEmailError('Enter a valid email');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (hasError) return;

    submittedRef.current = true;
    dispatch(
      loginRequest({
        email: normalizedEmail,
        password,
        device_name: 'mobile',
      }),
    );
  }, [dispatch, email, password]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate(routes.auth.forgotPassword);
  }, [navigation]);

  return {
    states: {
      email,
      setEmail,
      emailError,
      setEmailError,
      password,
      setPassword,
      passwordError,
      setPasswordError,
    },
    styles,
    handlers: {
      handleLogin,
      handleForgotPassword,
    },
    loader,
  };
};

export default useLogin;
