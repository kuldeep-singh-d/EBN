import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Handshake,
  Mail,
  MapPin,
  NotebookTabs,
  Phone,
  ReceiptText,
  Star,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import { AppText } from '@components';
import type useStyles from '../styles';
import type { SlipDetailPayload, SlipRecord } from '../types';

type SlipDetailProps = {
  detail?: SlipDetailPayload;
  loading: boolean;
  slip: SlipRecord;
  styles: ReturnType<typeof useStyles>;
};

type DetailRowProps = {
  Icon: LucideIcon;
  label: string;
  value?: unknown;
  styles: ReturnType<typeof useStyles>;
};

type ReferralStatusOption = {
  value: string;
  label: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
};

const getTextValue = (data: SlipDetailPayload | undefined, key: string) => {
  const value = data?.[key];

  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  return String(value);
};

const getAmountValue = (data: SlipDetailPayload | undefined, key: string) => {
  const value = getTextValue(data, key);

  if (!value) {
    return undefined;
  }

  return value.startsWith('₹') ? value : `₹${value}`;
};

const getStatusLabel = (detail?: SlipDetailPayload) =>
  getTextValue(detail, 'status_label') ?? getTextValue(detail, 'status');

const REFERRAL_STATUS_OPTIONS: ReferralStatusOption[] = [
  {
    value: 'not_contacted_yet',
    label: 'Not Contacted Yet ?',
    backgroundColor: '#F8FAFC',
    borderColor: '#B9CBE2',
    textColor: '#13233D',
  },
  {
    value: 'contacted',
    label: 'Contacted',
    backgroundColor: '#FFF5CF',
    borderColor: '#F59E0B',
    textColor: '#B45309',
  },
  {
    value: 'no_response',
    label: 'No response',
    backgroundColor: '#EEF2FF',
    borderColor: '#818CF8',
    textColor: '#4338CA',
  },
  {
    value: 'got_business',
    label: 'Got Business',
    backgroundColor: '#DDF7E8',
    borderColor: '#22C55E',
    textColor: '#166534',
  },
  {
    value: 'did_not_get_business',
    label: 'Did not get Business',
    backgroundColor: '#FFE1E1',
    borderColor: '#FB7185',
    textColor: '#BE123C',
  },
  {
    value: 'not_a_good_fit',
    label: 'Not a good fit',
    backgroundColor: '#FFF7ED',
    borderColor: '#F97316',
    textColor: '#C2410C',
  },
  {
    value: 'confidential',
    label: 'Confidential',
    backgroundColor: '#F8FAFC',
    borderColor: '#B9CBE2',
    textColor: '#13233D',
  },
];

const normalizeStatusValue = (value?: string) =>
  value
    ?.trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_');

const getReferralStatusOption = (detail?: SlipDetailPayload) => {
  const statusValues = [
    getTextValue(detail, 'status_label'),
    getTextValue(detail, 'status'),
  ].map(normalizeStatusValue);

  return (
    REFERRAL_STATUS_OPTIONS.find(
      option =>
        statusValues.includes(normalizeStatusValue(option.label)) ||
        statusValues.includes(option.value),
    ) ?? REFERRAL_STATUS_OPTIONS[0]
  );
};

const RATING_LABELS: Record<number, string> = {
  5: 'Hot Lead',
  4: 'Warm Lead',
  3: 'Average Lead',
  2: 'Cold Lead',
  1: 'Very Cold Lead',
};

const getRatingLabel = (value?: unknown) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const rating = Number(value);
  const label = RATING_LABELS[rating];

  return label ? `${rating} - ${label}` : String(value);
};

const canShowReferralUpdateButton = (
  slip: SlipRecord,
  detail?: SlipDetailPayload,
) => {
  if (slip.detailType !== 'referral') {
    return false;
  }

  const statusValues = [
    getTextValue(detail, 'status'),
    getTextValue(detail, 'status_label'),
  ].map(value => value?.trim().toLowerCase());

  return !statusValues.includes('got business');
};

const getHeroTitle = (slip: SlipRecord, detail?: SlipDetailPayload) => {
  if (slip.detailType === 'referral') {
    return (
      getTextValue(detail, 'prospect_name') ??
      getTextValue(detail, 'with_member_name') ??
      slip.title
    );
  }

  if (slip.detailType === 'close_business') {
    return (
      getTextValue(detail, 'prospect_name') ??
      getTextValue(detail, 'with_member_name') ??
      slip.title
    );
  }

  return getTextValue(detail, 'with_member_name') ?? slip.title;
};

const getHeroSubtitle = (slip: SlipRecord, detail?: SlipDetailPayload) => {
  if (slip.detailType === 'meet') {
    return [
      getTextValue(detail, 'date'),
      getTextValue(detail, 'time'),
      getTextValue(detail, 'mode'),
    ]
      .filter(Boolean)
      .join(' - ');
  }

  if (slip.detailType === 'referral') {
    return [
      getTextValue(detail, 'company_name'),
      getAmountValue(detail, 'estimated_value'),
    ]
      .filter(Boolean)
      .join(' - ');
  }

  return [getAmountValue(detail, 'amount'), getTextValue(detail, 'paid_date')]
    .filter(Boolean)
    .join(' - ');
};

const getDetailIcon = (slip: SlipRecord) => {
  switch (slip.detailType) {
    case 'meet':
      return Handshake;
    case 'referral':
      return NotebookTabs;
    default:
      return BadgeIndianRupee;
  }
};

const getDetailLabel = (slip: SlipRecord) => {
  switch (slip.detailType) {
    case 'meet':
      return 'Meet';
    case 'referral':
      return 'Referral';
    default:
      return 'Close Business';
  }
};

const DetailRow = ({ Icon, label, value, styles }: DetailRowProps) => {
  const normalizedValue =
    typeof value === 'boolean'
      ? value
        ? 'Yes'
        : 'No'
      : value === undefined || value === null || value === ''
      ? '-'
      : String(value);

  return (
    <View style={styles.detailRow}>
      <View style={styles.detailRowIcon}>
        <Icon
          width={styles.detailIcon.width}
          height={styles.detailIcon.height}
          color={styles.detailIcon.color}
        />
      </View>
      <View style={styles.detailRowBody}>
        <AppText label={label} style={styles.detailLabel} />
        <AppText
          semibold
          numberOfLines={4}
          label={normalizedValue}
          style={styles.detailValue}
        />
      </View>
    </View>
  );
};

const SlipDetail = ({ detail, loading, slip, styles }: SlipDetailProps) => {
  const DetailIcon = getDetailIcon(slip);
  const statusLabel = getStatusLabel(detail);
  const heroSubtitle = getHeroSubtitle(slip, detail);
  const showUpdateReferral = canShowReferralUpdateButton(slip, detail);
  const currentReferralStatus = useMemo(
    () => getReferralStatusOption(detail),
    [detail],
  );
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isStatusListVisible, setIsStatusListVisible] = useState(false);
  const [selectedReferralStatus, setSelectedReferralStatus] =
    useState<ReferralStatusOption>(currentReferralStatus);
  const [actualBusinessValue, setActualBusinessValue] = useState('');

  const openStatusModal = () => {
    setSelectedReferralStatus(currentReferralStatus);
    setActualBusinessValue('');
    setIsStatusListVisible(false);
    setIsStatusModalVisible(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalVisible(false);
    setIsStatusListVisible(false);
  };

  const submitStatusUpdate = () => {
    closeStatusModal();
  };

  if (loading && !detail) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={styles.loaderIcon.color} />
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={styles.emptyState}>
        <AppText
          semibold
          centered
          label="Slip Not Found"
          style={styles.emptyTitle}
        />
        <AppText
          centered
          label="Please go back and try again."
          style={styles.emptyText}
        />
      </View>
    );
  }

  const renderMeetDetail = () => (
    <View style={styles.detailCard}>
      <AppText
        semibold
        label="Meeting Information"
        style={styles.detailSectionTitle}
      />
      <DetailRow
        Icon={UserRound}
        label="With Member"
        value={detail.with_member_name}
        styles={styles}
      />
      <DetailRow
        Icon={Building2}
        label="Chapter"
        value={detail.chapter_name}
        styles={styles}
      />
      <DetailRow
        Icon={CalendarDays}
        label="Date"
        value={detail.date}
        styles={styles}
      />
      <DetailRow
        Icon={Clock3}
        label="Time"
        value={detail.time}
        styles={styles}
      />
      <DetailRow
        Icon={UsersRound}
        label="Mode"
        value={detail.mode}
        styles={styles}
      />
      <DetailRow
        Icon={MapPin}
        label="Location"
        value={detail.location}
        styles={styles}
      />
      <DetailRow
        Icon={ReceiptText}
        label="Topics Discussed"
        value={detail.topics_discussed}
        styles={styles}
      />
    </View>
  );

  const renderReferralDetail = () => (
    <View style={styles.detailCard}>
      <AppText
        semibold
        label="Referral Information"
        style={styles.detailSectionTitle}
      />
      <DetailRow
        Icon={UserRound}
        label="With Member"
        value={detail.with_member_name}
        styles={styles}
      />
      <DetailRow
        Icon={UsersRound}
        label="Type"
        value={detail.type}
        styles={styles}
      />
      <DetailRow
        Icon={CalendarDays}
        label="Date Submitted"
        value={detail.date_submitted}
        styles={styles}
      />
      <DetailRow
        Icon={UserRound}
        label="Prospect Name"
        value={detail.prospect_name}
        styles={styles}
      />
      <DetailRow
        Icon={BriefcaseBusiness}
        label="Company"
        value={detail.company_name}
        styles={styles}
      />
      <DetailRow
        Icon={Phone}
        label="Phone"
        value={detail.phone}
        styles={styles}
      />
      <DetailRow
        Icon={Mail}
        label="Email"
        value={detail.email}
        styles={styles}
      />
      <DetailRow
        Icon={ReceiptText}
        label="Requirement"
        value={detail.requirement}
        styles={styles}
      />
      <DetailRow
        Icon={BadgeIndianRupee}
        label="Estimated Value"
        value={getAmountValue(detail, 'estimated_value')}
        styles={styles}
      />
      <DetailRow
        Icon={Star}
        label="Rating"
        value={getRatingLabel(detail.rating)}
        styles={styles}
      />
    </View>
  );

  const renderCloseBusinessDetail = () => (
    <View style={styles.detailCard}>
      <AppText
        semibold
        label="Business Information"
        style={styles.detailSectionTitle}
      />
      <DetailRow
        Icon={UserRound}
        label="With Member"
        value={detail.with_member_name}
        styles={styles}
      />
      <DetailRow
        Icon={UserRound}
        label="Prospect Name"
        value={detail.prospect_name}
        styles={styles}
      />
      <DetailRow
        Icon={UsersRound}
        label="Type"
        value={detail.type}
        styles={styles}
      />
      <DetailRow
        Icon={BadgeIndianRupee}
        label="Amount"
        value={getAmountValue(detail, 'amount')}
        styles={styles}
      />
      <DetailRow
        Icon={CalendarDays}
        label="Paid Date"
        value={detail.paid_date}
        styles={styles}
      />
    </View>
  );

  const renderStatusOption = (option: ReferralStatusOption) => {
    const isSelected = selectedReferralStatus.value === option.value;

    return (
      <Pressable
        key={option.value}
        accessibilityRole="button"
        onPress={() => {
          setSelectedReferralStatus(option);
          setIsStatusListVisible(false);
        }}
        style={({ pressed }) => [
          styles.updateStatusOption,
          {
            backgroundColor: option.backgroundColor,
            borderColor: option.borderColor,
          },
          pressed && styles.detailUpdateReferralButtonPressed,
        ]}
      >
        <AppText
          semibold={isSelected}
          label={option.label}
          style={[styles.updateStatusOptionText, { color: option.textColor }]}
        />
        {isSelected ? (
          <Check
            width={styles.updateStatusCheckIcon.width}
            height={styles.updateStatusCheckIcon.height}
            color={option.textColor}
          />
        ) : null}
      </Pressable>
    );
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailContent}
      >
        <View style={styles.detailHero}>
          <View style={styles.detailHeroIcon}>
            <DetailIcon
              width={styles.detailHeroGlyph.width}
              height={styles.detailHeroGlyph.height}
              color={styles.detailHeroGlyph.color}
            />
          </View>
          <View style={styles.detailHeroBody}>
            <AppText
              semibold
              numberOfLines={2}
              label={getHeroTitle(slip, detail)}
              style={styles.detailName}
            />
            <AppText
              numberOfLines={2}
              label={heroSubtitle || getDetailLabel(slip)}
              style={styles.detailSubtitle}
            />
            {statusLabel ? (
              <View style={styles.detailStatusPill}>
                <AppText
                  semibold
                  label={statusLabel}
                  style={styles.detailStatusText}
                />
              </View>
            ) : null}
          </View>
        </View>

        {slip.detailType === 'meet'
          ? renderMeetDetail()
          : slip.detailType === 'referral'
          ? renderReferralDetail()
          : renderCloseBusinessDetail()}

        {showUpdateReferral ? (
          <Pressable
            accessibilityRole="button"
            onPress={openStatusModal}
            style={({ pressed }) => [
              styles.detailUpdateReferralButton,
              pressed && styles.detailUpdateReferralButtonPressed,
            ]}
          >
            <AppText
              semibold
              centered
              label="Update Status"
              style={styles.detailUpdateReferralText}
            />
          </Pressable>
        ) : null}
      </ScrollView>

      <Modal
        transparent
        statusBarTranslucent
        animationType="fade"
        visible={isStatusModalVisible}
        onRequestClose={closeStatusModal}
      >
        <View style={styles.updateStatusModalOverlay}>
          <Pressable
            style={styles.updateStatusModalBackdrop}
            onPress={closeStatusModal}
          />
          <View style={styles.updateStatusModalCard}>
            <View style={styles.updateStatusModalHeader}>
              <AppText
                semibold
                label="Update Elite Referral Status"
                style={styles.updateStatusModalTitle}
              />
              <Pressable
                accessibilityRole="button"
                hitSlop={8}
                onPress={closeStatusModal}
                style={styles.updateStatusCloseButton}
              >
                <X
                  width={styles.updateStatusCloseIcon.width}
                  height={styles.updateStatusCloseIcon.height}
                  color={styles.updateStatusCloseIcon.color}
                />
              </Pressable>
            </View>

            <View style={styles.updateStatusModalBody}>
              <AppText
                semibold
                label="New Status"
                style={styles.updateStatusFieldLabel}
              />
              <Pressable
                accessibilityRole="button"
                onPress={() => setIsStatusListVisible(current => !current)}
                style={[
                  styles.updateStatusSelect,
                  {
                    backgroundColor: selectedReferralStatus.backgroundColor,
                    borderColor: selectedReferralStatus.borderColor,
                  },
                ]}
              >
                <AppText
                  semibold
                  numberOfLines={1}
                  label={selectedReferralStatus.label}
                  style={[
                    styles.updateStatusSelectText,
                    { color: selectedReferralStatus.textColor },
                  ]}
                />
                <ChevronDown
                  width={styles.updateStatusChevron.width}
                  height={styles.updateStatusChevron.height}
                  color={styles.updateStatusChevron.color}
                />
              </Pressable>

              {isStatusListVisible ? (
                <View style={styles.updateStatusOptionsList}>
                  {REFERRAL_STATUS_OPTIONS.map(renderStatusOption)}
                </View>
              ) : null}

              {selectedReferralStatus.value === 'got_business' ? (
                <View style={styles.updateStatusAmountBlock}>
                  <AppText
                    semibold
                    label="Actual Close Business Value (₹)"
                    style={styles.updateStatusFieldLabel}
                  />
                  <TextInput
                    value={actualBusinessValue}
                    keyboardType="number-pad"
                    placeholder="e.g. 50000"
                    cursorColor={styles.updateStatusInput.color}
                    selectionColor={styles.updateStatusInput.color}
                    placeholderTextColor={styles.updateStatusPlaceholder.color}
                    onChangeText={setActualBusinessValue}
                    style={styles.updateStatusInput}
                  />
                </View>
              ) : null}
            </View>

            <View style={styles.updateStatusActions}>
              <Pressable
                accessibilityRole="button"
                onPress={closeStatusModal}
                style={({ pressed }) => [
                  styles.updateStatusCancelButton,
                  pressed && styles.detailUpdateReferralButtonPressed,
                ]}
              >
                <AppText
                  semibold
                  centered
                  label="Cancel"
                  style={styles.updateStatusCancelText}
                />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={submitStatusUpdate}
                style={({ pressed }) => [
                  styles.updateStatusSubmitButton,
                  pressed && styles.detailUpdateReferralButtonPressed,
                ]}
              >
                <AppText
                  semibold
                  centered
                  label="Update Status"
                  style={styles.updateStatusSubmitText}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SlipDetail;
