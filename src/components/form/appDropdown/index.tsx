import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import useStyles from './styles';
import { AppText } from '@components';
import { Check, ChevronDown, X } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { AppDropdownProps, DropdownItem } from './types';

const AppDropdown = ({
  title = '',
  error = '',
  style,
  disabled = false,
  loading = false,
  wrapperStyle,
  labelStyle,
  emptyLabel = 'No items found',
  leftIcon,
  rightElement,
  itemList,
  selectedValues = [],
  selectedValue = null,
  placeholder = 'Select',
  placeholderStyle,
  multiSelection = false,
  canClear = false,
  isSearching = false,

  setError,
  onSelectItem,
  onSelectItems,
  onSearchChange,
}: AppDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const styles = useStyles();
  const { colors } = useTheme();

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return itemList;
    }

    const query = searchQuery.toLowerCase().trim();

    return itemList.filter(item => item.label.toLowerCase().includes(query));
  }, [itemList, searchQuery]);

  const openDropdown = useCallback(() => {
    if (disabled || loading) {
      return;
    }

    setIsOpen(current => !current);
    setSearchQuery('');
  }, [disabled, loading]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
  }, []);

  const handleSingleSelect = useCallback(
    (item: DropdownItem) => {
      onSelectItem?.(item);
      setError?.('');
      closeDropdown();
    },
    [closeDropdown, onSelectItem, setError],
  );

  const handleMultiToggle = useCallback(
    (item: DropdownItem) => {
      const isSelected = selectedValues.some(v => v.value === item.value);
      const updated = isSelected
        ? selectedValues.filter(v => v.value !== item.value)
        : [...selectedValues, item];

      onSelectItems?.(updated);
      setError?.('');
    },
    [onSelectItems, selectedValues, setError],
  );

  const handleRemoveChip = useCallback(
    (item: DropdownItem) => {
      const updated = selectedValues.filter(v => v.value !== item.value);
      onSelectItems?.(updated);
      setError?.('');
    },
    [onSelectItems, selectedValues, setError],
  );

  const handleClearSelection = useCallback(() => {
    onSelectItem?.(null);
    setError?.('');
  }, [onSelectItem, setError]);

  const isItemSelected = useCallback(
    (item: DropdownItem) => {
      return multiSelection
        ? selectedValues.some(v => v.value === item.value)
        : selectedValue?.value === item.value;
    },
    [multiSelection, selectedValue, selectedValues],
  );

  const renderTriggerContent = () => {
    if (multiSelection) {
      if (selectedValues.length === 0) {
        return (
          <AppText
            medium
            label={placeholder}
            color={colors.gray}
            style={[styles.placeholderText, placeholderStyle]}
          />
        );
      }

      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScrollContainer}
          contentContainerStyle={styles.chipsContentContainer}
        >
          {selectedValues.map(item => (
            <View key={item.value} style={styles.chip}>
              <AppText
                numberOfLines={1}
                label={item.label}
                style={styles.chipLabel}
              />

              <Pressable
                hitSlop={6}
                style={styles.chipClose}
                onPress={event => {
                  event.stopPropagation();
                  handleRemoveChip(item);
                }}
              >
                <X
                  width={styles.chipCloseIcon.width}
                  height={styles.chipCloseIcon.height}
                  color={styles.chipCloseIcon.color}
                />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      );
    }

    return (
      <AppText
        medium
        numberOfLines={1}
        style={[
          styles.selectedText,
          selectedValue ? labelStyle : placeholderStyle,
        ]}
        color={selectedValue ? colors.text : colors.gray}
        label={selectedValue ? selectedValue.label : placeholder}
      />
    );
  };

  const renderDropdownItem = (item: DropdownItem) => {
    const selected = isItemSelected(item);

    return (
      <Pressable
        key={item.value}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        onPress={() =>
          multiSelection ? handleMultiToggle(item) : handleSingleSelect(item)
        }
        style={({ pressed }) => [
          styles.itemRow,
          selected && styles.itemRowSelected,
          pressed && styles.itemRowPressed,
        ]}
      >
        <AppText
          numberOfLines={1}
          label={item.label}
          style={[styles.itemLabel, selected && styles.itemSelected]}
        />
        {selected ? (
          <View style={styles.checkIcon}>
            <Check
              width={styles.checkGlyph.width}
              height={styles.checkGlyph.height}
              color={styles.checkGlyph.color}
            />
          </View>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={[styles.wrapper, wrapperStyle, isOpen && styles.wrapperOpen]}>
      {title !== '' && <AppText medium label={title} style={styles.title} />}

      <Pressable
        disabled={disabled || loading}
        style={[
          styles.inputWrapper,
          isOpen && styles.inputWrapperOpen,
          disabled && styles.disabledInputWrapper,
          style,
        ]}
        onPress={openDropdown}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || loading, expanded: isOpen }}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
        {renderTriggerContent()}
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary as string} />
        ) : !multiSelection && selectedValue && canClear ? (
          <Pressable
            hitSlop={8}
            onPress={event => {
              event.stopPropagation();
              handleClearSelection();
            }}
            style={styles.clearButton}
          >
            <X
              width={styles.clearIcon.width}
              height={styles.clearIcon.height}
              color={styles.clearIcon.color}
            />
          </Pressable>
        ) : rightElement ? (
          <View style={styles.rightElement}>{rightElement}</View>
        ) : (
          <ChevronDown
            width={styles.chevronIcon.width}
            height={styles.chevronIcon.height}
            color={styles.chevronIcon.color}
          />
        )}
      </Pressable>

      {isOpen ? (
        <View style={styles.inlinePanel}>
          {isSearching ? (
            <View style={styles.searchContainer}>
              <TextInput
                value={searchQuery}
                autoCorrect={false}
                placeholder="Search..."
                style={styles.searchInput}
                onChangeText={text => {
                  setSearchQuery(text);
                  onSearchChange?.(text);
                }}
                cursorColor={colors.text as string}
                selectionColor={colors.primary as string}
                placeholderTextColor={colors.gray as string}
              />
            </View>
          ) : null}

          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
          >
            {loading ? (
              <View style={styles.emptyContainer}>
                <ActivityIndicator
                  size="small"
                  color={colors.primary as string}
                />
              </View>
            ) : filteredItems.length ? (
              filteredItems.map(renderDropdownItem)
            ) : (
              <View style={styles.emptyContainer}>
                <AppText label={emptyLabel} style={styles.emptyText} />
              </View>
            )}
          </ScrollView>

          {multiSelection ? (
            <Pressable
              accessibilityRole="button"
              onPress={closeDropdown}
              style={({ pressed }) => [
                styles.doneButton,
                pressed && styles.itemRowPressed,
              ]}
            >
              <AppText semibold label="Done" style={styles.doneText} />
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {error !== '' && error !== null && (
        <AppText label={error} color={'red'} style={styles.errorText} />
      )}
    </View>
  );
};

export default memo(AppDropdown);
