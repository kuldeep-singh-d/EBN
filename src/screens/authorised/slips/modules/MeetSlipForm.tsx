import React from 'react';
import { Handshake } from 'lucide-react-native';

import SlipFormPlaceholder from './SlipFormPlaceholder';
import type useStyles from '../styles';

type MeetSlipFormProps = {
  styles: ReturnType<typeof useStyles>;
  onBackPress: () => void;
};

const MeetSlipForm = ({ styles, onBackPress }: MeetSlipFormProps) => (
  <SlipFormPlaceholder
    Icon={Handshake}
    title="Meet"
    description="Meet form module is ready for fields."
    styles={styles}
    onBackPress={onBackPress}
  />
);

export default MeetSlipForm;
