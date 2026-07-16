import type { LucideIcon } from 'lucide-react-native';

export type MenuItemId =
  | 'profile'
  | 'meetingSummary'
  | 'about'
  | 'termsOfServices'
  | 'privacyPolicy'
  | 'logout';

export type MenuItem = {
  id: MenuItemId;
  label: string;
  icon: LucideIcon;
  destructive?: boolean;
};
