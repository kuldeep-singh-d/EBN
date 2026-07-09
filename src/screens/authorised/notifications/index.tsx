import React from 'react';
import { View } from 'react-native';

import { AppContainer, AppText } from '@components';
import { EllipsisVertical } from 'lucide-react-native';
import useNotifications from './useNotifications';

export const Notifications = () => {
  const { styles, states, handlers, constants } = useNotifications();

  return (
    <AppContainer
      centerTitle
      title="NOTIFICATIONS"
      rightIcon={EllipsisVertical}
      contentStyle={styles.content}
      headerIconColor={String(styles.headerIcon.color)}
      headerTitleStyle={styles.headerTitle}
      rightMenuItems={constants.menuItems}
      onRightActionPress={handlers.handleMenuAction}
    >
      <View style={styles.container}>
        {states.screenData.items.length ? (
          states.screenData.items.map(item => (
            <View key={item.id} style={styles.notificationRow}>
              <View style={styles.unreadColumn}>
                {item.unread ? <View style={styles.unreadDot} /> : null}
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <AppText label={item.sender} style={styles.sender} />
                  {item.timeAgo ? (
                    <AppText label={item.timeAgo} style={styles.timeAgo} />
                  ) : null}
                </View>
                <AppText
                  label={item.message}
                  style={[styles.message, item.unread && styles.unreadMessage]}
                />
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <AppText
              centered
              label="No notifications"
              style={styles.emptyText}
            />
          </View>
        )}
      </View>
    </AppContainer>
  );
};
