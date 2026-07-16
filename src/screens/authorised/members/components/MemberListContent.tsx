import React from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { Search } from 'lucide-react-native';

import { AppText } from '@components';
import useStyles from '../styles';
import type { MemberProfile } from '../types';
import MemberCard from './MemberCard';

type MemberListContentProps = {
  count: number;
  emptyDescription: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isInitialLoading: boolean;
  isRefreshing: boolean;
  members: MemberProfile[];
  searchPlaceholder?: string;
  searchValue?: string;
  title: string;
  onFetchNext: () => void;
  onMemberPress: (memberId: number) => void;
  onRefresh: () => void;
  onSearchChange?: (value: string) => void;
};

const MemberListContent = ({
  count,
  emptyDescription,
  hasNextPage,
  isFetchingNextPage,
  isInitialLoading,
  isRefreshing,
  members,
  searchPlaceholder,
  searchValue,
  title,
  onFetchNext,
  onMemberPress,
  onRefresh,
  onSearchChange,
}: MemberListContentProps) => {
  const styles = useStyles();

  const handleScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (
      isInitialLoading ||
      isRefreshing ||
      isFetchingNextPage ||
      !hasNextPage
    ) {
      return;
    }

    const distanceFromBottom =
      nativeEvent.contentSize.height -
      (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y);

    if (distanceFromBottom <= 96) {
      onFetchNext();
    }
  };

  return (
    <View style={styles.rosterContainer}>
      <View style={styles.searchPanel}>
        <View style={styles.rosterSummary}>
          <AppText semibold label={title} style={styles.rosterTitle} />
          <AppText label={`${count} members`} style={styles.rosterCount} />
        </View>

        {onSearchChange ? (
          <View style={styles.searchBox}>
            <Search
              width={styles.searchIcon.width}
              height={styles.searchIcon.height}
              color={styles.searchIcon.color}
            />
            <TextInput
              value={searchValue}
              placeholder={searchPlaceholder}
              placeholderTextColor={styles.placeholder.color}
              cursorColor={styles.inputText.color}
              selectionColor={styles.inputText.color}
              onChangeText={onSearchChange}
              style={[styles.searchInput, styles.inputText]}
            />
          </View>
        ) : null}
      </View>

      {isInitialLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={styles.loaderIcon.color} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.memberList}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={styles.refreshControl.color}
              colors={[styles.refreshControl.color]}
            />
          }
        >
          {members.length ? (
            members.map(member => (
              <MemberCard
                key={member.id}
                member={member}
                onPress={onMemberPress}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <AppText
                semibold
                centered
                label="No members found"
                style={styles.emptyTitle}
              />
              <AppText
                centered
                label={emptyDescription}
                style={styles.emptyText}
              />
            </View>
          )}

          {isFetchingNextPage ? (
            <View style={styles.paginationLoader}>
              <ActivityIndicator size="small" color={styles.loaderIcon.color} />
            </View>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
};

export default MemberListContent;
