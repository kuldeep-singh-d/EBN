import { useState } from 'react';

import useStyles from './styles';
import { LoginCredentials } from './types';
// import { routes } from '@navigation/routes';
// import { useNavigation } from '@react-navigation/native';

interface LoginResponse {
  message: {
    data: any;
    error?: string;
    message?: string;
  };
}

const useLogin = () => {
  const styles = useStyles();
  //   const navigation = useNavigation<any>();

  const [fcmToken, setFcmToken] = useState('');
  const [email, setEmail] = useState<LoginCredentials['email']>('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState<LoginCredentials['password']>('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {};

  const handlers = {
    handleLogin,
  };

  const states = {
    email,
    setEmail,
    emailError,
    setEmailError,
    fcmToken,
    setFcmToken,
    password,
    setPassword,
    passwordError,
    setPasswordError,
  };

  return {
    states,
    styles,
    handlers,
    loader: false,
  };
};

export default useLogin;
