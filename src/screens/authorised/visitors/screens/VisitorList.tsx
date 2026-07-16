import React from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { UserPlus } from 'lucide-react-native';

import { AppText } from '@components';
import VisitorListCard from '../components/VisitorListCard';
import useVisitorList from '../hooks/useVisitorList';
import useStyles from '../styles';

type VisitorListProps = {
  onAddPress: () => void;
  onVisitorPress: (id: number) => void;
};

const VisitorList = ({ onAddPress, onVisitorPress }: VisitorListProps) => {
  const styles = useStyles();
  const { states, handlers } = useVisitorList();

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
      handlers.fetchNextVisitors();
    }
  };

  if (states.isInitialLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={styles.loaderIcon.color} />
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onScroll={handleListScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={states.isRefreshing}
            onRefresh={handlers.refreshVisitors}
            tintColor={styles.refreshControl.color}
            colors={[styles.refreshControl.color]}
          />
        }
      >
        {states.visitors.length ? (
          states.visitors.map(visitor => (
            <VisitorListCard
              key={visitor.id}
              visitor={visitor}
              onPress={onVisitorPress}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <AppText
              semibold
              centered
              label="No Visitors"
              style={styles.emptyTitle}
            />
            <AppText
              centered
              label="Create a visitor invitation to see it here."
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

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add visitor"
        onPress={onAddPress}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
      >
        <UserPlus
          width={styles.addIcon.width}
          height={styles.addIcon.height}
          color={styles.addIcon.color}
        />
      </Pressable>
    </View>
  );
};

export default VisitorList;
