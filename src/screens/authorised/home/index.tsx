import React from 'react';
import useHome from './useHome';
import { Svgs } from '@assets/svgs';
import { Image, Pressable, View } from 'react-native';
import { AppContainer, AppText } from '@components';

export const Home = () => {
  const { styles, states, handlers } = useHome();
  const { member, nextMeeting, quickActions, slips, stats, trafficLight } =
    states.screenData;

  return (
    <AppContainer hideBackBtn contentStyle={styles.content}>
      <View style={styles.container}>
        <View style={styles.memberCard}>
          <Image source={member.avatar} style={styles.avatar} />
          <View style={styles.memberInfo}>
            <AppText medium label={member.name} style={styles.memberName} />
            <AppText label={member.company} style={styles.memberText} />
            <AppText label={member.status} style={styles.memberText} />
            <AppText
              label={`Due Date: ${member.dueDate}`}
              style={styles.memberText}
            />
          </View>
          <AppText label="›" style={styles.chevron} />
        </View>

        <View style={styles.card}>
          {/* <View style={styles.corner} /> */}
          <View style={styles.cardHeader}>
            <View style={styles.headerSpacer} />
            <AppText
              medium
              centered
              label={nextMeeting.title}
              style={styles.cardTitle}
            />
            <Svgs.OpenEye
              width={styles.eyeIcon.width}
              height={styles.eyeIcon.height}
              color={styles.eyeIcon.color}
            />
          </View>
          <AppText
            centered
            label={nextMeeting.date}
            style={styles.meetingDate}
          />
          <AppText
            centered
            label={nextMeeting.type}
            style={styles.meetingType}
          />
          <View style={styles.meetingMetrics}>
            <View style={styles.metricGroup}>
              <View style={styles.metricRow}>
                <AppText label="TYFCB" style={styles.metricLabel} />
                <AppText label={nextMeeting.tyfcb} style={styles.metricValue} />
              </View>
              <View style={styles.metricRow}>
                <AppText label="SPEAKERS" style={styles.metricLabel} />
                <AppText
                  label={nextMeeting.speakers}
                  style={styles.metricValue}
                />
              </View>
            </View>
            <View style={styles.visitorMetric}>
              <AppText label="VISITORS" style={styles.metricLabel} />
              <AppText
                label={nextMeeting.visitors}
                style={styles.metricValue}
              />
            </View>
          </View>
          <View style={styles.linkRow}>
            <Svgs.HomeLink
              width={styles.linkIcon.width}
              height={styles.linkIcon.height}
              color={styles.linkIcon.color}
            />
            <AppText label={nextMeeting.linkLabel} style={styles.linkText} />
          </View>
        </View>

        <View style={styles.card}>
          {/* <View style={styles.corner} /> */}
          <AppText
            medium
            centered
            label="THIS WEEK'S SLIPS"
            style={styles.cardTitle}
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
                  <AppText label={value} style={styles.slipValue} />
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
                  <Icon
                    width={styles.quickActionIcon.width}
                    height={styles.quickActionIcon.height}
                    color={styles.quickActionIcon.color}
                  />
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
          {/* <View style={styles.corner} /> */}
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
          <View style={styles.trafficHeaderRow}>
            <View style={styles.trafficNameColumn} />
            <AppText
              label={trafficLight.rateLabel}
              style={styles.trafficHead}
            />
            <AppText
              label={trafficLight.scoreLabel}
              style={styles.trafficHead}
            />
          </View>
          {trafficLight.rows.map(row => (
            <View key={row.id} style={styles.trafficRow}>
              <AppText label={row.label} style={styles.trafficLabel} />
              <AppText label={row.rate} style={styles.trafficRate} />
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
