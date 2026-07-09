const common = Object.freeze({
  white: '#FFFFFF',
  black: '#000000',
  card: 'transparent',
  border: '#D8DEE8',
  brandRed: '#CE1F34',
  background: '#F5F7FA',
  notification: 'transparent',
  //
  gray: '#64748B',
  placeholder: '#BFC1C5',
  primaryBorder: '#B9CBE2',
  primarySurface: '#EAF1FA',
  toastWarn: '#FFF5CF',
  toastError: '#FFE1E1',
  toastSuccess: '#DDF7E8',
  overlay: 'rgba(0,0,0,0.2)',
  whiteMuted: 'rgba(255,255,255,0.72)',
  whiteSubtle: 'rgba(255,255,255,0.12)',
});

export const colors = {
  light: {
    text: '#13233D',
    primary: '#1B539A',
    primaryDark: '#13233D',
    secondary: '#13233D',
    ...common,
  },
  dark: {
    text: '#13233D',
    primary: '#1B539A',
    primaryDark: '#13233D',
    secondary: '#13233D',
    ...common,
  },
};
