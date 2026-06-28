import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from '@hooks';
import { routes } from '@navigation/routes';
import { getApiErrorMessage } from '@utils/apiError';
import {
  ForgotPasswordResponse,
  forgotPassword as forgotPasswordRequest,
  reset as resetForgotPassword,
} from '@store/slices/auth/forgotPassword';
import { ForgotPasswordForm } from './types';
import useStyles from './styles';

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const useForgotPassword = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const loader = useSelector(state => Boolean(state.forgotPassword?.loading));
  const forgotPasswordResponse = useSelector(
    state => state.forgotPassword?.data,
  ) as ForgotPasswordResponse | undefined;
  const forgotPasswordError = useSelector(state => state.forgotPassword?.error);
  const submittedRef = useRef(false);

  const [email, setEmail] = useState<ForgotPasswordForm['email']>('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isSuccessScreen, setIsSuccessScreen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetForgotPassword());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!submittedRef.current || !forgotPasswordResponse) return;

    submittedRef.current = false;
    setApiError('');
    setIsSuccessScreen(true);
  }, [forgotPasswordResponse]);

  useEffect(() => {
    if (!submittedRef.current || !forgotPasswordError) return;

    submittedRef.current = false;
    setApiError(
      getApiErrorMessage(
        forgotPasswordError as any,
        'Unable to send reset link. Please try again.',
      ),
    );
  }, [forgotPasswordError]);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setApiError('');
  }, []);

  const handleSubmit = useCallback(() => {
    if (loader) return;

    const normalizedEmail = email.trim();

    setApiError('');

    if (!normalizedEmail) {
      setEmailError('Email is required');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setEmailError('Enter a valid email');
      return;
    }

    setEmailError('');
    submittedRef.current = true;
    dispatch(forgotPasswordRequest(normalizedEmail));
  }, [dispatch, email, loader]);

  const handleBackToLogin = useCallback(() => {
    dispatch(resetForgotPassword());
    navigation.navigate(routes.auth.login);
  }, [dispatch, navigation]);

  return {
    styles,
    states: {
      email,
      emailError,
      apiError,
      isSuccessScreen,
      setEmail: handleEmailChange,
      setEmailError,
    },
    handlers: {
      handleSubmit,
      handleBackToLogin,
    },
    loader,
  };
};

export default useForgotPassword;
