import { Dispatch, ReactNode, SetStateAction } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface DropdownItem {
  label: string;
  value: string;
}

export interface AppDropdownProps {
  title?: string;
  error?: string;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  canClear?: boolean;
  wrapperStyle?: ViewStyle;
  labelStyle?: TextStyle;
  emptyLabel?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  placeholder?: string;
  placeholderStyle?: TextStyle;
  itemList: DropdownItem[];
  multiSelection?: boolean;
  isSearching?: boolean;
  selectedValues?: DropdownItem[];
  selectedValue?: DropdownItem | null;
  setError?: Dispatch<SetStateAction<string>>;
  onSelectItems?: (items: DropdownItem[]) => void;
  onSelectItem?: (item: DropdownItem | null) => void;
  onSearchChange?: (query: string) => void;
}
