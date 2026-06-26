import { useCallback, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';

import useStyles from './styles';
import { NotificationsData } from './types';

const useNotifications = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation: any = useNavigation();

  const [screenData, setScreenData] = useState<NotificationsData>({
    unreadCount: 0,
  });

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    styles,
    colors,
    states: {
      screenData,
    },
    handlers: {
      setScreenData,
      handleBack,
    },
    constants: {},
  };
};

export default useNotifications;
