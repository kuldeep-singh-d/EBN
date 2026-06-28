import { useState } from 'react';

import useStyles from './styles';
import { PaymentData } from './types';

const usePayment = () => {
  const styles = useStyles();
  const [screenData, setScreenData] = useState<PaymentData>({
    title: 'Payment',
  });

  return {
    styles,
    states: {
      screenData,
    },
    handlers: {
      setScreenData,
    },
    constants: {},
  };
};

export default usePayment;
