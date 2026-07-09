import '@react-navigation/native';
import { ColorValue } from 'react-native';

type Color = ColorValue | string;

export type Theme = {
  dark: boolean;
  colors: {
    card: Color;
    text: Color;
    gray: Color;
    white: Color;
    black: Color;
    border: Color;
    brandRed: Color;
    primary: Color;
    primaryDark: Color;
    primaryBorder: Color;
    primarySurface: Color;
    overlay: Color;
    secondary: Color;
    toastWarn: Color;
    toastError: Color;
    background: Color;
    toastSuccess: Color;
    notification: Color;
    whiteMuted: Color;
    whiteSubtle: Color;
  };
};
declare module '@react-navigation/native' {
  export function useTheme(): Theme;
}
