import React from 'react';
import { NotebookTabs } from 'lucide-react-native';

import SlipFormPlaceholder from './SlipFormPlaceholder';
import type useStyles from '../styles';

type ReferralSlipFormProps = {
  styles: ReturnType<typeof useStyles>;
  onBackPress: () => void;
};

const ReferralSlipForm = ({ styles, onBackPress }: ReferralSlipFormProps) => (
  <SlipFormPlaceholder
    Icon={NotebookTabs}
    title="Referral"
    description="Referral form module is ready for fields."
    styles={styles}
    onBackPress={onBackPress}
  />
);

export default ReferralSlipForm;
