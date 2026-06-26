import Toast from 'react-native-toast-message';

const display = (type: 'success' | 'error' | 'info', message: string) => {
  if (!message) return;

  Toast.show({
    type,
    text1: message,
  });
};

export const show = {
  success: (message: string) => display('success', message),
  error: (message: string) => display('error', message),
  info: (message: string) => display('info', message),
};
