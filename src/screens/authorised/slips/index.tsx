import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
  ChevronRight,
  CirclePlus,
  SlidersHorizontal,
} from 'lucide-react-native';

import { AppContainer, AppText } from '@components';
import useSlips from './useSlips';
import type { SlipFilterOption, SlipRecord } from './types';

export const Slips = () => {
  const { styles, states, handlers } = useSlips();
  const { screenData } = states;

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

  return (
    <AppContainer
      listing
      centerTitle
      hideBackBtn
      title={screenData.title}
      showHeaderActions={false}
      contentStyle={styles.content}
      headerStyle={styles.header}
      headerTitleStyle={styles.headerTitle}
    >
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
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
        </ScrollView>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add slip"
          onPress={handlers.onAddPress}
          style={({ pressed }) => [
            styles.addButton,
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
    </AppContainer>
  );
};
