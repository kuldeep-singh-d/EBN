import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ForgotPasswordForm } from './types';
import useStyles from './styles';

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const useForgotPassword = () => {
  const styles = useStyles();
  const navigation: any = useNavigation();

  const [email, setEmail] = useState<ForgotPasswordForm['email']>('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = useCallback(() => {
    const normalizedEmail = email.trim();

    setSuccessMessage('');

    if (!normalizedEmail) {
      setEmailError('Email is required');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setEmailError('Enter a valid email');
      return;
    }

    setEmailError('');
    setSuccessMessage('Reset link sent');
  }, [email]);

  const handleBackToLogin = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    styles,
    states: {
      email,
      emailError,
      successMessage,
      setEmail,
      setEmailError,
    },
    handlers: {
      handleSubmit,
      handleBackToLogin,
    },
  };
};

export default useForgotPassword;
