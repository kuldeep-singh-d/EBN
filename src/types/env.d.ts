declare module '@env' {
  export const BASE_URL: string | undefined;
}

declare module 'react-native-date-picker' {
  import { ComponentType } from 'react';

  type DatePickerProps = {
    modal?: boolean;
    mode?: 'date' | 'time' | 'datetime';
    open?: boolean;
    minimumDate?: Date;
    maximumDate?: Date;
    date: Date;
    onConfirm?: (date: Date) => void;
    onCancel?: () => void;
  };

  const DatePicker: ComponentType<DatePickerProps>;
  export default DatePicker;
}

declare module '*.svg' {
  import { ComponentType } from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: ComponentType<SvgProps>;
  export default content;
}
