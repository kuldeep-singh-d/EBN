import React from 'react';
import useHome from './useHome';
import { MapPin, QrCode } from 'lucide-react-native';
import { AppContainer, AppText } from '@components';
import { Image, Pressable, RefreshControl, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

export const Home = () => {
  const { styles, states, handlers } = useHome();
  const { member, nextMeeting, quickActions, slips, stats, trafficLight } =
    states.screenData;

  return (
    <AppContainer
      hideBackBtn
      contentStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={states.isRefreshing}
          onRefresh={handlers.onRefresh}
          tintColor={styles.refreshControl.color}
          colors={[String(styles.refreshControl.color)]}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.memberCard}>
          <Svg pointerEvents="none" style={styles.memberGradient}>
            <Defs>
              <LinearGradient
                id="profileCardGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <Stop offset="0" stopColor={styles.memberGradientStart.color} />
                <Stop offset="1" stopColor={styles.memberGradientEnd.color} />
              </LinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#profileCardGradient)"
            />
          </Svg>

          <Image source={member.avatar} style={styles.avatar} />

          <View style={styles.memberInfo}>
            <AppText medium label={member.name} style={styles.memberName} />
            <AppText label={member.company} style={styles.memberText} />
            <AppText
              label={`Due Date: ${member.dueDate}`}
              style={styles.memberText}
            />
          </View>
          <View style={styles.statusPill}>
            <AppText semibold label={member.status} style={styles.statusText} />
          </View>
          {/* <AppText label="›" style={styles.chevron} /> */}
        </View>

        <View style={[styles.card, styles.meetingCard]}>
          {/* <View style={styles.corner} /> */}
          <View style={styles.cardHeader}>
            <AppText
              medium
              style={styles.cardTitle}
              label={nextMeeting.title}
            />
          </View>
          <AppText
            label={
              nextMeeting.time
                ? `${nextMeeting.date} | ${nextMeeting.time}`
                : nextMeeting.date
            }
            style={styles.meetingDate}
          />
          <AppText label={nextMeeting.type} style={styles.meetingType} />
          {nextMeeting.venue ? (
            <AppText label={nextMeeting.venue} style={styles.meetingVenue} />
          ) : null}
          {nextMeeting.address && nextMeeting.address !== 'N/A' ? (
            <View style={styles.meetingAddressRow}>
              <AppText
                numberOfLines={2}
                label={nextMeeting.address}
                style={styles.meetingAddress}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open meeting location"
                onPress={handlers.onMeetingLocationPress}
                style={({ pressed }) => [
                  styles.locationButton,
                  pressed && styles.locationButtonPressed,
                ]}
              >
                <MapPin
                  width={styles.locationIcon.width}
                  color={styles.locationIcon.color}
                  height={styles.locationIcon.height}
                />
              </Pressable>
            </View>
          ) : null}
          {nextMeeting.canScanQr ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="QR Code"
              onPress={handlers.onQrCodePress}
              style={({ pressed }) => [
                styles.qrButton,
                pressed && styles.qrButtonPressed,
              ]}
            >
              <QrCode
                width={styles.qrIcon.width}
                height={styles.qrIcon.height}
                color={styles.qrIcon.color}
              />
              <AppText medium label="QR Code" style={styles.qrButtonText} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.card}>
          <AppText
            semibold
            centered
            style={styles.cardTitle}
            label="THIS MONTH'S SLIPS"
          />
          <View style={styles.slipsList}>
            {slips.map(({ id, label, value, icon: Icon }) => (
              <View key={id} style={styles.slipRow}>
                <View style={styles.slipLabelRow}>
                  <Icon
                    width={styles.slipIcon.width}
                    height={styles.slipIcon.height}
                    color={styles.slipIcon.color}
                  />
                  <AppText label={label} style={styles.slipLabel} />
                </View>
                <View style={styles.slipValueRow}>
                  <AppText
                    semibold
                    label={value}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.78}
                    style={styles.slipValue}
                  />
                  <AppText label="+" style={styles.plusText} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, styles.quickActionCard]}>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(action => {
              const Icon = action.icon;

              return (
                <Pressable
                  key={action.id}
                  accessibilityRole="button"
                  accessibilityLabel={action.label}
                  onPress={() => handlers.onQuickActionPress(action)}
                  style={({ pressed }) => [
                    styles.quickActionItem,
                    pressed && styles.quickActionItemPressed,
                  ]}
                >
                  <View style={styles.quickActionIconShell}>
                    <Icon
                      width={styles.quickActionIcon.width}
                      height={styles.quickActionIcon.height}
                      color={styles.quickActionIcon.color}
                    />
                  </View>
                  <AppText
                    medium
                    centered
                    numberOfLines={2}
                    label={action.label}
                    style={styles.quickActionLabel}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rangeTabs}>
            {stats.ranges.map(range => (
              <Pressable
                key={range}
                hitSlop={8}
                onPress={() => handlers.setSelectedStatsRange(range)}
              >
                <AppText
                  medium={range === states.selectedStatsRange}
                  label={range}
                  style={[
                    styles.rangeText,
                    range === states.selectedStatsRange &&
                      styles.activeRangeText,
                  ]}
                />
              </Pressable>
            ))}
          </View>
          <View style={styles.statsList}>
            {states.statsRows.map(row => (
              <View key={row.id} style={styles.statRow}>
                <AppText label={row.label} style={styles.statLabel} />
                <AppText label={row.value} style={styles.statValue} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          {/* <View style={styles.corner} /> */}
          <AppText
            centered
            label={trafficLight.title}
            style={styles.trafficTitle}
          />
          <View style={styles.trafficTotalRow}>
            <AppText
              label={trafficLight.totalLabel}
              style={styles.trafficTotalLabel}
            />
            <View
              style={[
                styles.trafficScoreBadge,
                styles[`${trafficLight.totalTone}ScoreBadge`],
              ]}
            >
              <AppText
                centered
                label={trafficLight.totalScore}
                style={styles.trafficScoreText}
              />
            </View>
          </View>
          {/* <View style={styles.trafficHeaderRow}>
            <View style={styles.trafficNameColumn} />

            <AppText
              label={trafficLight.scoreLabel}
              style={styles.trafficHead}
            />
          </View> */}
          {trafficLight.rows.map(row => (
            <View key={row.id} style={styles.trafficRow}>
              <AppText label={row.label} style={styles.trafficLabel} />
              <View
                style={[
                  styles.trafficScoreBadge,
                  styles[`${row.tone}ScoreBadge`],
                ]}
              >
                <AppText
                  centered
                  label={row.score}
                  style={styles.trafficScoreText}
                />
              </View>
            </View>
          ))}
          <AppText
            centered
            label={trafficLight.footer}
            style={styles.trafficFooter}
          />
        </View>
      </View>
    </AppContainer>
  );
};
