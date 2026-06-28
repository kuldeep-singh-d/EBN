import React, { ReactNode, useEffect, useState } from 'react';
import {
  View,
  Modal,
  ViewStyle,
  Pressable,
  StyleProp,
  TextStyle,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { Svgs } from '@assets/svgs';
import type { SvgProps } from 'react-native-svg';
import { routes } from '@navigation/routes';
import { useDeviceDimensions } from '@hooks/index';
import { AppText, KeyboardAvoider, Loader } from '@components';
import { useTheme, useNavigation } from '@react-navigation/native';

interface AppContainerProps {
  loading?: boolean;
  listing?: boolean;
  canLogout?: boolean;
  children?: ReactNode;
  hideBackBtn?: boolean;
  centerTitle?: boolean;
  headerIconSize?: number;
  headerIconColor?: string;
  showHeaderActions?: boolean;
  onBackPress?: () => void;
  onMenuPress?: () => void;
  title?: string | undefined;
  onNotificationPress?: () => void;
  onHeaderRightPress?: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  rightIcon?: React.ComponentType<SvgProps>;
  rightComponent?: ReactNode;
  rightMenuItems?: HeaderMenuItem[];
  onRightActionPress?: (item: HeaderMenuItem) => void;
}

export type HeaderMenuItem = {
  id: string;
  label: string;
};

const AppContainer = ({
  loading,
  listing,
  children,
  title = '',
  headerStyle,
  onBackPress,
  contentStyle,
  headerIconSize,
  headerIconColor,
  showHeaderActions = true,
  headerTitleStyle,
  canLogout = false,
  onMenuPress,
  onNotificationPress,
  onHeaderRightPress,
  rightComponent,
  rightMenuItems = [],
  onRightActionPress,
  hideBackBtn = false,
  centerTitle = false,
  rightIcon: RightIcon,
}: AppContainerProps) => {
  const styles = useStyles();
  // const { logout, username } = useAuthStore();
  // const queryClient = useQueryClient();
  const navigation: any = useNavigation();
  const [isRightMenuVisible, setIsRightMenuVisible] = useState(false);
  const { moderateHeight } = useDeviceDimensions();
  const iconSize = headerIconSize ?? moderateHeight(3);
  const actionIconColor = String(
    headerIconColor ?? styles.headerActionIcon.color,
  );

  const handleBackBtn = (): void => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const handleBackButton = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  const handleLogout = () => {
    // logout();
    // queryClient.clear();
  };

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
      return;
    }

    navigation.navigate(routes.app.notifications);
  };

  const handleRightPress = () => {
    if (rightMenuItems.length) {
      setIsRightMenuVisible(true);
      return;
    }

    onHeaderRightPress?.();
  };

  const handleRightMenuPress = (item: HeaderMenuItem) => {
    setIsRightMenuVisible(false);
    onRightActionPress?.(item);
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, centerTitle && styles.centerHeader, headerStyle]}
      >
        <View style={[styles.titleView, centerTitle && styles.centerTitleView]}>
          {!hideBackBtn && (
            <Pressable onPress={handleBackBtn} style={styles.backBtn}>
              <Svgs.BackArrow
                width={iconSize}
                height={iconSize}
                color={headerIconColor}
              />
            </Pressable>
          )}
          {!centerTitle && (
            <AppText
              centered
              semibold
              label={title}
              numberOfLines={1}
              style={[styles.title, headerTitleStyle]}
            />
          )}
        </View>

        {centerTitle && (
          <View pointerEvents="none" style={styles.titleCenterSlot}>
            <AppText
              centered
              semibold
              label={title}
              numberOfLines={1}
              style={[styles.title, styles.centeredTitle, headerTitleStyle]}
            />
          </View>
        )}

        {rightComponent ? (
          rightComponent
        ) : RightIcon ? (
          <Pressable
            onPress={handleRightPress}
            disabled={!onHeaderRightPress && !rightMenuItems.length}
            style={styles.headerRightBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <RightIcon
              width={iconSize}
              height={iconSize}
              color={headerIconColor}
            />
          </Pressable>
        ) : showHeaderActions ? (
          <View style={styles.headerActions}>
            <Pressable
              style={styles.headerActionBtn}
              onPress={handleNotificationPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 8 }}
            >
              <Svgs.HeaderNotification
                color={actionIconColor}
                width={styles.notificationIcon.width}
                height={styles.notificationIcon.height}
              />
            </Pressable>
            <Pressable
              onPress={onMenuPress}
              disabled={!onMenuPress}
              style={styles.headerActionBtn}
              hitSlop={{ top: 12, bottom: 12, left: 8, right: 12 }}
            >
              <Svgs.HeaderMenu
                color={actionIconColor}
                width={styles.menuIcon.width}
                height={styles.menuIcon.height}
              />
            </Pressable>
          </View>
        ) : centerTitle ? (
          <View style={styles.headerRightBtn} />
        ) : null}

        {canLogout && (
          <Pressable
            onPress={handleLogout}
            style={styles.logoutBtn}
            hitSlop={{ top: 18, bottom: 18, left: 18, right: 18 }}
          />
        )}
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={isRightMenuVisible}
        onRequestClose={() => setIsRightMenuVisible(false)}
      >
        <Pressable
          style={styles.menuOverlay}
          onPress={() => setIsRightMenuVisible(false)}
        >
          <View style={styles.rightMenu}>
            {rightMenuItems.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => handleRightMenuPress(item)}
                style={[
                  styles.rightMenuItem,
                  index > 0 && styles.rightMenuItemBorder,
                ]}
              >
                <AppText label={item.label} style={styles.rightMenuText} />
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {listing !== undefined ? (
        <View style={[styles.keyboardAwar, contentStyle]}>{children}</View>
      ) : (
        <KeyboardAvoider
          contentContainerStyle={[styles.keyboardAwar, contentStyle]}
        >
          {children}
        </KeyboardAvoider>
      )}
      {loading && <Loader visible={loading} />}
    </View>
  );
};

export default AppContainer;

const useStyles = () => {
  const { colors } = useTheme();
  const { moderateWidth, moderateHeight } = useDeviceDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },

    backBtn: {},
    keyboardAwar: {
      flexGrow: 1,
      backgroundColor: colors.background,
      paddingHorizontal: moderateWidth(5),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: moderateHeight(6),
      backgroundColor: colors.white,
      justifyContent: 'space-between',
      paddingVertical: moderateHeight(1),
      paddingHorizontal: moderateWidth(5),
      position: 'relative',
    },
    title: {
      fontSize: moderateHeight(2.4),
    },
    centeredTitle: {
      marginLeft: 0,
      letterSpacing: 0,
      color: colors.gray,
      textTransform: 'uppercase',
      fontSize: moderateHeight(2.45),
    },
    userID: {
      marginLeft: moderateWidth(3),
      fontSize: moderateHeight(1.6),
    },
    titleView: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    centerHeader: {
      minHeight: moderateHeight(6.4),
    },
    centerTitleView: {
      minWidth: moderateHeight(3.8),
    },
    titleCenterSlot: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: moderateWidth(14),
      right: moderateWidth(14),
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerRightBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: moderateHeight(3.8),
      minHeight: moderateHeight(3.8),
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      columnGap: moderateWidth(2),
    },
    headerActionBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: moderateHeight(4.2),
      minHeight: moderateHeight(4.2),
    },
    headerActionIcon: {
      color: colors.primary,
    },
    notificationIcon: {
      width: moderateHeight(3.2),
      height: moderateHeight(3.2),
    },
    menuIcon: {
      width: moderateHeight(3),
      height: moderateHeight(3),
    },
    logoutBtn: {},
    menuOverlay: {
      flex: 1,
      backgroundColor: colors.card,
    },
    rightMenu: {
      position: 'absolute',
      top: moderateHeight(10),
      right: moderateWidth(10),
      width: moderateWidth(31),
      backgroundColor: colors.white,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 4,
    },
    rightMenuItem: {
      minHeight: moderateHeight(4.7),
      justifyContent: 'center',
      paddingHorizontal: moderateWidth(3.4),
    },
    rightMenuItemBorder: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    rightMenuText: {
      color: colors.secondary,
      fontSize: moderateHeight(1.48),
    },
  });
};
