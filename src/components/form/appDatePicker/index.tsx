import React, { memo, useState } from 'react';
import { Pressable, TextStyle, View, ViewStyle } from 'react-native';

import moment from 'moment';
import useStyles from './styles';
import { AppText } from '@components';
import { Calendar, X } from 'lucide-react-native';
import DatePicker from 'react-native-date-picker';
import { useTheme } from '@react-navigation/native';

interface AppDatePickerProps {
  value?: Date;
  title?: string;
  error?: string;
  style?: ViewStyle;
  wrapperStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  displayStyle?: TextStyle;
  minimumDate?: Date;
  maximumDate?: Date;
  isDisabled?: boolean;
  placeholder?: string;
  handleClearInput?(): void;
  setError?: (val: string) => void;
  mode?: 'date' | 'time' | 'datetime';
  onChangeDate?: (date: Date) => void;
}

const AppDatePicker = ({
  value,
  title = '',
  error = '',
  style,
  wrapperStyle,
  leftIcon,
  rightElement,
  displayStyle,
  minimumDate,
  maximumDate,
  isDisabled,
  mode = 'date',
  placeholder = 'DD/MM/YYYY',

  setError,
  onChangeDate,
  handleClearInput,
}: AppDatePickerProps) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  const getDisplayValue = () => {
    if (!value) return placeholder;
    if (mode === 'time') {
      return moment(value).format('hh:mm A'); // 12-hour format with AM/PM
    }
    return moment(value).format('DD-MM-YYYY');
  };

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {title && <AppText medium label={title} style={styles.title} />}

      <Pressable
        disabled={isDisabled}
        style={[
          styles.inputWrapper,
          isDisabled && styles.disabledInputWrapper,
          style,
        ]}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityState={{ disabled: Boolean(isDisabled) }}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
        <AppText
          medium
          numberOfLines={1}
          style={[styles.displayValue, displayStyle]}
          label={getDisplayValue()}
          color={value ? colors.text : colors.gray}
        />

        {value ? (
          <Pressable onPress={handleClearInput}>
            <X height={18} width={18} />
          </Pressable>
        ) : rightElement ? (
          rightElement
        ) : leftIcon ? null : (
          <Calendar />
        )}
      </Pressable>

      <DatePicker
        modal
        mode={mode}
        open={open && !isDisabled}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        date={value || new Date()}
        onConfirm={(date: Date) => {
          setOpen(false);
          setError && setError('');
          onChangeDate && onChangeDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      {error !== '' && error !== null && (
        <AppText label={error} color={'red'} style={styles.errorText} />
      )}
    </View>
  );
};

export default memo(AppDatePicker);
