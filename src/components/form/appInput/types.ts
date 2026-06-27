import { Dispatch, ReactNode, SetStateAction } from 'react';
import { TextInputProps, TextStyle, ViewStyle } from 'react-native';

interface AppInputProps extends TextInputProps {
  title?: string;
  error?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  password?: boolean;
  isRequired?: boolean;
  borderWidth?: boolean;
  secureEntry?: boolean;
  isContactNumber?: boolean;
  removeTopMargin?: boolean;
  isPassword?: boolean;
  showPasswordToggle?: boolean;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  gradientBorder?: boolean;
  onPress?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  setError?: Dispatch<SetStateAction<string>>;
}

export type { AppInputProps };
