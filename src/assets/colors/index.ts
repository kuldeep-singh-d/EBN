const common = Object.freeze({
  white: '#FFFFFF',
  black: '#000000',
  card: 'transparent',
  border: '#C8C8C8',
  brandRed: '#CE1F34',
  background: '#F3F4F6',
  notification: 'transparent',
  //
  gray: '#6B7280',
  placeholder: '#BFC1C5',
  toastWarn: '#FFF5CF',
  toastError: '#FFDFDF',
  toastSuccess: '#D7FFFF',
  overlay: 'rgba(0,0,0,0.2)',
});

export const colors = {
  light: {
    text: '#01071D',
    primary: '#23579F',
    secondary: '#01071D',
    ...common,
  },
  dark: {
    text: '#01071D',
    primary: '#23579F',
    secondary: '#01071D',
    ...common,
  },
};
