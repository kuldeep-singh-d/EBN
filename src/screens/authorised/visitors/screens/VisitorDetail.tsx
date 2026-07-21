import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import {
  BadgeIndianRupee,
  Building2,
  CalendarDays,
  Mail,
  Phone,
  ReceiptText,
  UserRound,
  UsersRound,
} from 'lucide-react-native';

import { AppText } from '@components';
import VisitorDetailRow from '../components/VisitorDetailRow';
import useVisitorDetail from '../hooks/useVisitorDetail';
import useStyles from '../styles';

type VisitorDetailProps = {
  visitorId: number | null;
};

const VisitorDetail = ({ visitorId }: VisitorDetailProps) => {
  const styles = useStyles();
  const { states } = useVisitorDetail(visitorId);
  const detail = states.detail;

  if (states.loading && !detail) {
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
          label="Visitor Not Found"
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
        <View style={styles.detailHeroIcon}>
          <UserRound
            width={styles.detailHeroGlyph.width}
            height={styles.detailHeroGlyph.height}
            color={styles.detailHeroGlyph.color}
          />
        </View>
        <View style={styles.detailHeroBody}>
          <AppText
            semibold
            numberOfLines={2}
            label={detail.full_name || '-'}
            style={styles.detailName}
          />
          <AppText
            numberOfLines={2}
            label={detail.company_name || '-'}
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
          label="Visitor Information"
          style={styles.detailSectionTitle}
        />
        <VisitorDetailRow
          label="Full Name"
          value={detail.full_name}
          Icon={UserRound}
        />
        <VisitorDetailRow
          label="Mobile Number"
          value={detail.mobile_no}
          Icon={Phone}
        />
        <VisitorDetailRow
          label="WhatsApp Number"
          value={detail.whatsapp_no}
          Icon={Phone}
        />
        <VisitorDetailRow label="Email" value={detail.email} Icon={Mail} />
      </View>

      <View style={styles.detailCard}>
        <AppText
          semibold
          label="Business Information"
          style={styles.detailSectionTitle}
        />
        <VisitorDetailRow
          label="Company Name"
          value={detail.company_name}
          Icon={Building2}
        />
        <VisitorDetailRow
          label="GST Number"
          value={detail.gst_no}
          Icon={BadgeIndianRupee}
        />
      </View>

      <View style={styles.detailCard}>
        <AppText
          semibold
          label="Meeting Information"
          style={styles.detailSectionTitle}
        />
        <VisitorDetailRow
          label="Invitation Date"
          value={detail.invitation_date}
          Icon={CalendarDays}
        />
        <VisitorDetailRow
          label="Chapter"
          value={detail.chapter?.name}
          Icon={Building2}
        />
        <VisitorDetailRow
          label="Chapter"
          value={detail.category?.name}
          Icon={UsersRound}
        />
        <VisitorDetailRow
          label="Sub-Chapter"
          value={detail.sub_category?.name}
          Icon={UsersRound}
        />
        <VisitorDetailRow
          label="Invited By"
          value={detail.inviter?.name}
          Icon={UserRound}
        />
      </View>

      <View style={styles.detailCard}>
        <AppText
          semibold
          label="Payment Information"
          style={styles.detailSectionTitle}
        />
        <VisitorDetailRow
          label="Status"
          value={detail.status}
          Icon={ReceiptText}
        />
      </View>
    </ScrollView>
  );
};

export default VisitorDetail;
