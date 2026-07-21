import React from 'react';
import { BadgeIndianRupee } from 'lucide-react-native';

import SlipFormPlaceholder from './SlipFormPlaceholder';
import type useStyles from '../styles';

type EliteSlipFormProps = {
  styles: ReturnType<typeof useStyles>;
  onBackPress: () => void;
};

const EliteSlipForm = ({ styles, onBackPress }: EliteSlipFormProps) => (
  <SlipFormPlaceholder
    Icon={BadgeIndianRupee}
    title="Elite"
    description="Elite form module is ready for fields."
    styles={styles}
    onBackPress={onBackPress}
  />
);

export default EliteSlipForm;
