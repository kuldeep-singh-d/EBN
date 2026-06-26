import { useCallback, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';

import useStyles from './styles';
import { SlipsData } from './types';

const useSlips = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation: any = useNavigation();

  const [screenData, setScreenData] = useState<SlipsData>({
    title: 'Slips',
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

export default useSlips;
