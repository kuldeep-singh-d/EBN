import React from 'react';
import { ActivityIndicator, Image, ScrollView, View } from 'react-native';
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Globe,
  Hash,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  UserRound,
  UsersRound,
} from 'lucide-react-native';

import { images } from '@assets/images';
import { AppText } from '@components';
import useStyles from '../styles';
import type { MemberApiRecord } from '../types';
import MemberDetailRow from './MemberDetailRow';

type MemberDetailProps = {
  detail?: MemberApiRecord;
  loading: boolean;
  showChapterInformation: boolean;
};

const MemberDetail = ({
  detail,
  loading,
  showChapterInformation,
}: MemberDetailProps) => {
  const styles = useStyles();
  const profile = detail?.member_profile;
  const avatarSource = profile?.avatar
    ? { uri: profile.avatar }
    : images.profilePlaceholder;
  const address = [profile?.office_address, profile?.city, profile?.pincode]
    .filter(Boolean)
    .join(', ');

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
          label="Member Not Found"
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.detailContent}
    >
      <View style={styles.detailHero}>
        <View style={styles.detailAvatarShell}>
          <Image source={avatarSource} style={styles.detailAvatar} />
        </View>
        <View style={styles.detailHeroBody}>
          <AppText
            semibold
            numberOfLines={2}
            label={detail.name || '-'}
            style={styles.detailName}
          />
          <AppText
            numberOfLines={2}
            label={profile?.company_name || profile?.brand_name || '-'}
            style={styles.detailCompany}
          />
          <View style={styles.statusPill}>
            <AppText
              semibold
              label={detail.status || '-'}
              style={styles.statusText}
            />
          </View>
        </View>
      </View>

      <View style={styles.detailCard}>
        <AppText
          semibold
          label="Member Information"
          style={styles.detailSectionTitle}
        />
        <MemberDetailRow label="Name" value={detail.name} Icon={UserRound} />
        <MemberDetailRow label="Email" value={detail.email} Icon={Mail} />
        <MemberDetailRow label="Phone" value={detail.phone} Icon={Phone} />
        <MemberDetailRow
          label="WhatsApp"
          value={profile?.whatsapp}
          Icon={Phone}
        />
        <MemberDetailRow
          label="Status"
          value={detail.status}
          Icon={ReceiptText}
        />
      </View>

      <View style={styles.detailCard}>
        <AppText
          semibold
          label="Business Information"
          style={styles.detailSectionTitle}
        />
        <MemberDetailRow
          label="Company Name"
          value={profile?.company_name}
          Icon={Building2}
        />
        <MemberDetailRow
          label="Brand Name"
          value={profile?.brand_name}
          Icon={BriefcaseBusiness}
        />
        <MemberDetailRow
          label="Nature of Business"
          value={profile?.nature_of_business}
          Icon={BriefcaseBusiness}
        />
        <MemberDetailRow
          label="Years in Business"
          value={profile?.years_in_business}
          Icon={CalendarDays}
        />
        <MemberDetailRow
          label="GST Number"
          value={profile?.gst_number}
          Icon={Hash}
        />
        <MemberDetailRow
          label="Website"
          value={profile?.website}
          Icon={Globe}
        />
      </View>

      <View style={styles.detailCard}>
        <AppText
          semibold
          label="Address Information"
          style={styles.detailSectionTitle}
        />
        <MemberDetailRow
          label="Address"
          value={address || undefined}
          Icon={MapPin}
        />
      </View>

      {showChapterInformation ? (
        <View style={styles.detailCard}>
          <AppText
            semibold
            label="Chapter Information"
            style={styles.detailSectionTitle}
          />
          <MemberDetailRow
            label="Chapter"
            value={detail.primary_chapter?.name}
            Icon={Building2}
          />
          <MemberDetailRow
            label="Chapter City"
            value={detail.primary_chapter?.city}
            Icon={MapPin}
          />
          <MemberDetailRow
            label="Category"
            value={detail.category?.name}
            Icon={UsersRound}
          />
          <MemberDetailRow
            label="Sub-Category"
            value={detail.sub_category?.name}
            Icon={UsersRound}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

export default MemberDetail;
