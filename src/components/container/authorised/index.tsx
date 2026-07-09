import React, { ReactNode, useEffect, useState } from 'react';
import {
  View,
  Modal,
  Image,
  ViewStyle,
  Pressable,
  StyleProp,
  TextStyle,
  StyleSheet,
  BackHandler,
  RefreshControlProps,
} from 'react-native';
import { images } from '@assets/images';
import { ArrowLeft, Bell, Menu, X, type LucideIcon } from 'lucide-react-native';
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
  rightIcon?: LucideIcon;
  rightComponent?: ReactNode;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  rightMenuItems?: HeaderMenuItem[];
  onRightActionPress?: (item: HeaderMenuItem) => void;
}

export type HeaderMenuItem = {
  id: string;
  label: string;
};

const HEADER_MENU_ITEMS: HeaderMenuItem[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'meetingSummary', label: 'Meeting Summary' },
  { id: 'about', label: 'About' },
  { id: 'termsOfServices', label: 'Terms Of Services' },
  { id: 'privacyPolicy', label: 'Privacy Policy' },
  { id: 'logout', label: 'Logout' },
];

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
  refreshControl,
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
  const [isHeaderMenuVisible, setIsHeaderMenuVisible] = useState(false);
  const { moderateHeight } = useDeviceDimensions();
  const iconSize = headerIconSize ?? moderateHeight(2.55);
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

  const handleMenuPress = () => {
    onMenuPress?.();
    setIsHeaderMenuVisible(true);
  };

  const handleHeaderMenuItemPress = (item: HeaderMenuItem) => {
    setIsHeaderMenuVisible(false);
    console.log('[Header Menu]', {
      id: item.id,
      label: item.label,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, centerTitle && styles.centerHeader, headerStyle]}
      >
        <View style={[styles.titleView, centerTitle && styles.centerTitleView]}>
          {!hideBackBtn && (
            <Pressable onPress={handleBackBtn} style={styles.backBtn}>
              <ArrowLeft
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
              <Bell
                color={actionIconColor}
                width={styles.notificationIcon.width}
                height={styles.notificationIcon.height}
              />
            </Pressable>
            <Pressable
              onPress={handleMenuPress}
              style={styles.headerActionBtn}
              hitSlop={{ top: 12, bottom: 12, left: 8, right: 12 }}
            >
              <Menu
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

      <Modal
        transparent
        animationType="fade"
        visible={isHeaderMenuVisible}
        onRequestClose={() => setIsHeaderMenuVisible(false)}
      >
        <View style={styles.headerMenuOverlay}>
          <Pressable
            style={styles.headerMenuBackdrop}
            onPress={() => setIsHeaderMenuVisible(false)}
          />
          <View style={styles.headerMenuPanel}>
            <View style={styles.headerMenuTop}>
              <Image
                resizeMode="contain"
                source={images.headerLogo}
                style={styles.headerMenuLogo}
              />
              <Pressable
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Close menu"
                onPress={() => setIsHeaderMenuVisible(false)}
                style={styles.headerMenuClose}
              >
                <X
                  width={styles.headerMenuCloseIcon.width}
                  height={styles.headerMenuCloseIcon.height}
                  color={styles.headerMenuCloseIcon.color}
                />
              </Pressable>
            </View>

            <View style={styles.headerMenuDivider} />

            <View style={styles.headerMenuItems}>
              {HEADER_MENU_ITEMS.map(item => (
                <Pressable
                  key={item.id}
                  accessibilityRole="button"
                  onPress={() => handleHeaderMenuItemPress(item)}
                  style={({ pressed }) => [
                    styles.headerMenuItem,
                    pressed && styles.headerMenuItemPressed,
                  ]}
                >
                  <AppText
                    centered
                    label={item.label}
                    style={styles.headerMenuItemText}
                  />
                </Pressable>
              ))}
            </View>

            <View style={styles.headerMenuDivider} />
            <AppText
              centered
              label="Version:3.26.0"
              style={styles.headerMenuVersion}
            />
          </View>
        </View>
      </Modal>

      {listing !== undefined ? (
        <View style={[styles.keyboardAwar, contentStyle]}>{children}</View>
      ) : (
        <KeyboardAvoider
          bounces={Boolean(refreshControl)}
          alwaysBounceVertical={Boolean(refreshControl)}
          overScrollMode={refreshControl ? 'always' : 'auto'}
          refreshControl={refreshControl}
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
      minHeight: moderateHeight(5.4),
      backgroundColor: colors.background,
      justifyContent: 'space-between',
      paddingVertical: moderateHeight(0.65),
      paddingHorizontal: moderateWidth(5),
      position: 'relative',
    },
    title: {
      fontSize: moderateHeight(2.1),
    },
    centeredTitle: {
      marginLeft: 0,
      letterSpacing: 0,
      color: colors.gray,
      textTransform: 'uppercase',
      fontSize: moderateHeight(2.1),
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
      minHeight: moderateHeight(5.6),
    },
    centerTitleView: {
      minWidth: moderateHeight(3.2),
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
      minWidth: moderateHeight(3.2),
      minHeight: moderateHeight(3.2),
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      columnGap: moderateWidth(1.4),
    },
    headerActionBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: moderateHeight(3.55),
      minHeight: moderateHeight(3.55),
    },
    headerActionIcon: {
      color: colors.primary,
    },
    notificationIcon: {
      width: moderateHeight(2.55),
      height: moderateHeight(2.55),
    },
    menuIcon: {
      width: moderateHeight(2.45),
      height: moderateHeight(2.45),
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
    headerMenuOverlay: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateWidth(5),
      backgroundColor: colors.overlay,
    },
    headerMenuBackdrop: {
      ...StyleSheet.absoluteFill,
    },
    headerMenuPanel: {
      width: '100%',
      maxWidth: moderateWidth(90),
      overflow: 'hidden',
      borderRadius: moderateWidth(5.5),
      backgroundColor: colors.primary,
      elevation: 8,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.22,
      shadowRadius: 8,
    },
    headerMenuTop: {
      minHeight: moderateHeight(18),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateWidth(8),
      paddingTop: moderateHeight(3),
      paddingBottom: moderateHeight(2.4),
    },
    headerMenuLogo: {
      width: moderateWidth(42),
      height: moderateHeight(8.2),
    },
    headerMenuClose: {
      position: 'absolute',
      top: moderateHeight(2.1),
      right: moderateWidth(4.2),
      alignItems: 'center',
      justifyContent: 'center',
      width: moderateHeight(4.2),
      height: moderateHeight(4.2),
    },
    headerMenuCloseIcon: {
      width: moderateHeight(3.1),
      height: moderateHeight(3.1),
      color: colors.white,
    },
    headerMenuDivider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.secondary,
      opacity: 0.35,
    },
    headerMenuItems: {
      paddingVertical: moderateHeight(1.6),
    },
    headerMenuItem: {
      minHeight: moderateHeight(6.2),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateWidth(5),
    },
    headerMenuItemPressed: {
      opacity: 0.72,
    },
    headerMenuItemText: {
      color: colors.white,
      fontSize: moderateHeight(2),
      lineHeight: moderateHeight(2.7),
    },
    headerMenuVersion: {
      color: colors.white,
      fontSize: moderateHeight(1.55),
      lineHeight: moderateHeight(2.2),
      paddingVertical: moderateHeight(2.2),
    },
  });
};
