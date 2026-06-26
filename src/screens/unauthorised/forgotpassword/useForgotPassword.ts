import { useCallback, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';

import useStyles from './styles';
import { ForgotPasswordForm } from './types';

const useForgotPassword = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation: any = useNavigation();

  const [email, setEmail] = useState<ForgotPasswordForm['email']>('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = useCallback(() => {}, []);
  const handleBackToLogin = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    styles,
    colors,
    states: {
      email,
      emailError,
    },
    handlers: {
      setEmail,
      setEmailError,
      handleSubmit,
      handleBackToLogin,
    },
    constants: {},
  };
};

export default useForgotPassword;
