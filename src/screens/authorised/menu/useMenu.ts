import { useCallback } from 'react';
import {
  ClipboardList,
  FileText,
  Info,
  LogOut,
  ShieldCheck,
  UserRound,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from '@hooks';
import { routes } from '@navigation/routes';
import useStyles from './styles';
import type { MenuItem } from './types';
import { setLoginState } from '@store/slices/app/localStates/loginState';

const MENU_ITEMS: MenuItem[] = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'meetingSummary', label: 'Meeting Summary', icon: ClipboardList },
  { id: 'about', label: 'About', icon: Info },
  { id: 'termsOfServices', label: 'Terms Of Services', icon: FileText },
  { id: 'privacyPolicy', label: 'Privacy Policy', icon: ShieldCheck },
  { id: 'logout', label: 'Logout', icon: LogOut, destructive: true },
];

const useMenu = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const handleMenuItemPress = useCallback(
    (item: MenuItem) => {
      if (item.id === 'profile') {
        navigation.navigate(routes.app.profile);
        return;
      }

      if (item.id === 'logout') {
        dispatch(setLoginState(false));
        return;
      }

      console.log('[Menu]', {
        id: item.id,
        label: item.label,
      });
    },
    [dispatch, navigation],
  );

  return {
    styles,
    states: {},
    handlers: {
      handleMenuItemPress,
    },
    constants: {
      menuItems: MENU_ITEMS,
      version: 'Version:3.26.0',
    },
  };
};

export default useMenu;
