import { useCallback, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';

import useStyles from './styles';
import { HomeData } from './types';

const useHome = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation: any = useNavigation();

  const [screenData, setScreenData] = useState<HomeData>({
    title: 'Home',
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

export default useHome;
