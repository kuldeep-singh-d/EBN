import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {
  ChevronRight,
  CirclePlus,
  X,
  SlidersHorizontal,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { AppContainer, AppText } from '@components';
import useSlips from './useSlips';
import { EliteSlipForm, MeetSlipForm, ReferralSlipForm } from './modules';
import type { SlipFilterOption, SlipFormType, SlipRecord } from './types';

export const Slips = () => {
  const { styles, states, handlers } = useSlips();
  const { screenData } = states;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: states.activeForm ? { display: 'none' } : undefined,
    });

    return () => {
      navigation.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation, states.activeForm]);

  const renderSlipIcon = (slip: SlipRecord) => {
    const Icon = screenData.filterOptions.find(
      option => option.key === slip.type,
    )?.icon;

    if (!Icon) {
      return null;
    }

    return (
      <View
        style={[
          styles.slipIconShell,
          slip.isHighlighted && styles.highlightedSlipIconShell,
        ]}
      >
        <Icon
          width={styles.slipIcon.width}
          height={styles.slipIcon.height}
          color={
            slip.isHighlighted
              ? styles.highlightedSlipIcon.color
              : styles.slipIcon.color
          }
        />
      </View>
    );
  };

  const renderFilterOption = (option: SlipFilterOption) => {
    const isActive = states.selectedFilter === option.key;
    const Icon = option.icon;

    return (
      <Pressable
        key={option.key}
        accessibilityRole="button"
        onPress={() => handlers.setFilter(isActive ? null : option.key)}
        style={({ pressed }) => [
          styles.filterOption,
          isActive && styles.activeFilterOption,
          pressed && styles.filterOptionPressed,
        ]}
      >
        <Icon
          width={styles.filterOptionIcon.width}
          height={styles.filterOptionIcon.height}
          color={
            isActive
              ? styles.activeFilterOptionText.color
              : styles.filterOptionIcon.color
          }
        />
        <AppText
          medium={isActive}
          centered
          label={option.label}
          style={[
            styles.filterOptionText,
            isActive && styles.activeFilterOptionText,
          ]}
        />
      </Pressable>
    );
  };

  const renderAddOption = (option: SlipFilterOption) => {
    const Icon = option.icon;

    return (
      <Pressable
        key={option.key}
        accessibilityRole="button"
        onPress={() => handlers.onAddOptionPress(option.key)}
        style={({ pressed }) => [
          styles.addMenuOption,
          pressed && styles.addMenuOptionPressed,
        ]}
      >
        <View style={styles.addMenuIconShell}>
          <Icon
            width={styles.addMenuIcon.width}
            height={styles.addMenuIcon.height}
            color={styles.addMenuIcon.color}
          />
        </View>
        <AppText
          semibold
          numberOfLines={1}
          label={option.label}
          style={styles.addMenuOptionText}
        />
      </Pressable>
    );
  };

  const renderSlip = (slip: SlipRecord) => (
    <Pressable
      key={slip.id}
      accessibilityRole="button"
      onPress={() => handlers.onSlipPress(slip.id)}
      style={({ pressed }) => [
        styles.slipCard,
        pressed && styles.slipCardPressed,
      ]}
    >
      {slip.isHighlighted ? <View style={styles.highlightBar} /> : null}
      {renderSlipIcon(slip)}
      <View style={styles.slipBody}>
        <AppText label={slip.date} style={styles.slipDate} />
        <AppText
          semibold
          numberOfLines={2}
          label={slip.amount ? `${slip.title} - ${slip.amount}` : slip.title}
          style={styles.slipTitle}
        />
        <AppText
          numberOfLines={2}
          label={slip.subtitle}
          style={styles.slipSubtitle}
        />
      </View>
      <ChevronRight
        width={styles.chevron.width}
        height={styles.chevron.height}
        color={styles.chevron.color}
      />
    </Pressable>
  );

  const handleListScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (states.loading || states.isFetchingNextPage || !states.hasNextPage) {
      return;
    }

    const distanceFromBottom =
      nativeEvent.contentSize.height -
      (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y);

    if (distanceFromBottom <= 96) {
      handlers.fetchNextSlips();
    }
  };

  const renderActiveForm = (form: SlipFormType) => {
    switch (form) {
      case 'meet':
        return (
          <MeetSlipForm styles={styles} onBackPress={handlers.onBackToList} />
        );
      case 'referral':
        return (
          <ReferralSlipForm
            styles={styles}
            onBackPress={handlers.onBackToList}
          />
        );
      default:
        return (
          <EliteSlipForm styles={styles} onBackPress={handlers.onBackToList} />
        );
    }
  };

  const renderList = () => (
    <View style={styles.container}>
      <View style={styles.topControls}>
        <View style={styles.tabs}>
          {screenData.tabs.map(tab => {
            const isActive = states.activeTab === tab.key;

            return (
              <Pressable
                key={tab.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                onPress={() => handlers.setActiveSlipTab(tab.key)}
                style={[styles.tab, isActive && styles.activeTab]}
              >
                <AppText
                  semibold={isActive}
                  centered
                  label={tab.label}
                  style={[styles.tabText, isActive && styles.activeTabText]}
                />
              </Pressable>
            );
          })}
        </View>

        <Pressable
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Filter slips"
          onPress={handlers.toggleFilter}
          style={({ pressed }) => [
            styles.filterButton,
            states.isFilterVisible && styles.activeFilterButton,
            pressed && styles.filterButtonPressed,
          ]}
        >
          <SlidersHorizontal
            width={styles.filterIcon.width}
            height={styles.filterIcon.height}
            color={
              states.isFilterVisible
                ? styles.activeFilterIcon.color
                : styles.filterIcon.color
            }
          />
        </Pressable>

        {states.isFilterVisible ? (
          <View style={styles.filterPopover}>
            <View style={styles.filterPopoverArrow} />
            <View style={styles.filterPopoverHeader}>
              <AppText
                semibold
                label="Filter Slips"
                style={styles.filterTitle}
              />
              <Pressable
                accessibilityRole="button"
                onPress={() => handlers.setFilter(null)}
                style={({ pressed }) => [
                  styles.clearFilterButton,
                  pressed && styles.filterOptionPressed,
                ]}
              >
                <X
                  width={styles.clearFilterIcon.width}
                  height={styles.clearFilterIcon.height}
                  color={styles.clearFilterIcon.color}
                />
                <AppText
                  semibold
                  label="Clear"
                  style={styles.clearFilterText}
                />
              </Pressable>
            </View>
            <View style={styles.filterOptions}>
              {screenData.filterOptions.map(renderFilterOption)}
            </View>
          </View>
        ) : null}
      </View>

      <View style={styles.summaryCard}>
        <View>
          <AppText
            semibold
            label={`${states.filteredSlips.length} ${
              states.filteredSlips.length === 1 ? 'slip' : 'slips'
            }`}
            style={styles.summaryTitle}
          />
          <AppText
            label={
              states.activeFilterLabel
                ? `${states.activeFilterLabel} • ${
                    states.activeTab === 'given' ? 'Given' : 'Received'
                  }`
                : states.activeTab === 'given'
                ? 'Given slips'
                : 'Received slips'
            }
            style={styles.summarySubtitle}
          />
        </View>
      </View>

      {states.isInitialLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={styles.loaderIcon.color} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onScroll={handleListScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={states.isRefreshing}
              onRefresh={handlers.refreshSlips}
              tintColor={styles.refreshControl.color}
              colors={[styles.refreshControl.color]}
            />
          }
        >
          {states.filteredSlips.length ? (
            states.filteredSlips.map(renderSlip)
          ) : (
            <View style={styles.emptyState}>
              <AppText
                semibold
                centered
                label={`No ${
                  states.activeTab === 'given' ? 'Given' : 'Received'
                } Slips`}
                style={styles.emptyTitle}
              />
              <AppText
                centered
                label="Try changing the filter or add a new slip."
                style={styles.emptyText}
              />
            </View>
          )}

          {states.isFetchingNextPage ? (
            <View style={styles.paginationLoader}>
              <ActivityIndicator size="small" color={styles.loaderIcon.color} />
            </View>
          ) : null}
        </ScrollView>
      )}

      {states.isAddMenuVisible ? (
        <View style={styles.addMenu}>
          <View style={styles.addMenuArrow} />
          {states.addOptions.map(renderAddOption)}
        </View>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add slip"
        onPress={handlers.onAddPress}
        style={({ pressed }) => [
          styles.addButton,
          states.isAddMenuVisible && styles.activeAddButton,
          pressed && styles.addButtonPressed,
        ]}
      >
        <CirclePlus
          width={styles.addIcon.width}
          height={styles.addIcon.height}
          color={styles.addIcon.color}
        />
      </Pressable>
    </View>
  );

  return (
    <AppContainer
      listing
      centerTitle
      hideBackBtn={!states.activeForm}
      title={
        states.activeForm
          ? `${
              screenData.filterOptions.find(
                option => option.key === states.activeForm,
              )?.label ?? 'Slip'
            } Slip`
          : screenData.title
      }
      onBackPress={handlers.onBackToList}
      showHeaderActions={false}
      headerIconColor={String(styles.headerIcon.color)}
      contentStyle={styles.content}
      headerStyle={styles.header}
      headerTitleStyle={styles.headerTitle}
    >
      {states.activeForm ? renderActiveForm(states.activeForm) : renderList()}
    </AppContainer>
  );
};
