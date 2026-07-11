import React from 'react';
import { Pressable, View } from 'react-native';

import { AppButton, AppContainer, AppInput, AppText } from '@components';
import {
  BadgeIndianRupee,
  Building2,
  Calendar,
  ChevronDown,
  Mail,
  Phone,
  TicketCheck,
  UserRound,
  type LucideIcon,
} from 'lucide-react-native';
import useVisitors from './useVisitors';

export const Visitors = () => {
  const { styles, states, handlers } = useVisitors();
  const { form, title } = states.screenData;

  const renderIconBubble = (Icon: LucideIcon, onPress?: () => void) => {
    const Content = (
      <Icon
        width={styles.fieldIcon.width}
        height={styles.fieldIcon.height}
        color={styles.fieldIcon.color}
      />
    );

    if (onPress) {
      return (
        <Pressable
          hitSlop={8}
          onPress={onPress}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.iconBubble,
            pressed && styles.iconBubblePressed,
          ]}
        >
          {Content}
        </Pressable>
      );
    }

    return <View style={styles.iconBubble}>{Content}</View>;
  };

  return (
    <AppContainer
      centerTitle
      hideBackBtn
      showHeaderActions={false}
      title={title}
      contentStyle={styles.content}
      headerStyle={styles.header}
      headerTitleStyle={styles.headerTitle}
    >
      <View style={styles.form}>
        {/* <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <TicketCheck
              width={styles.summaryIconGlyph.width}
              height={styles.summaryIconGlyph.height}
              color={styles.summaryIconGlyph.color}
            />
          </View>
          <View style={styles.summaryTextBlock}>
            <AppText
              semibold
              label="Visitor Invitation"
              style={styles.summaryTitle}
            />
            <AppText
              label="Email is required to continue."
              style={styles.summaryText}
            />
          </View>
        </View> */}

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <AppText
              semibold
              label="Visitor Details"
              style={styles.sectionTitle}
            />
            <AppText label="Required *" style={styles.sectionMeta} />
          </View>

          <AppInput
            value={form.firstName}
            placeholder="First Name"
            autoCapitalize="words"
            onChangeText={value => handlers.setFormValue('firstName', value)}
            placeholderTextColor={styles.placeholder.color}
            style={styles.inputWrapper}
            inputStyle={styles.inputText}
            leftIcon={renderIconBubble(UserRound, handlers.onContactPress)}
          />

          <AppInput
            value={form.lastName}
            placeholder="Last Name"
            autoCapitalize="words"
            onChangeText={value => handlers.setFormValue('lastName', value)}
            placeholderTextColor={styles.placeholder.color}
            style={styles.inputWrapper}
            inputStyle={styles.inputText}
            leftIcon={renderIconBubble(UserRound)}
          />

          <AppInput
            value={form.email}
            placeholder="Email *"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            onChangeText={value => handlers.setFormValue('email', value)}
            placeholderTextColor={styles.placeholder.color}
            style={styles.inputWrapper}
            inputStyle={styles.inputText}
            leftIcon={renderIconBubble(Mail)}
          />

          <AppInput
            value={form.whatsappNumber}
            placeholder="WhatsApp Number"
            keyboardType="phone-pad"
            onChangeText={value =>
              handlers.setFormValue('whatsappNumber', value)
            }
            placeholderTextColor={styles.placeholder.color}
            style={styles.inputWrapper}
            inputStyle={styles.inputText}
            leftIcon={renderIconBubble(Phone)}
          />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <AppText
              semibold
              label="Business Details"
              style={styles.sectionTitle}
            />
          </View>

          <AppInput
            value={form.companyName}
            placeholder="Company Name"
            autoCapitalize="words"
            onChangeText={value => handlers.setFormValue('companyName', value)}
            placeholderTextColor={styles.placeholder.color}
            style={styles.inputWrapper}
            inputStyle={styles.inputText}
            leftIcon={renderIconBubble(Building2)}
          />

          <AppInput
            value={form.gstNumber}
            placeholder="GST Number"
            autoCapitalize="characters"
            onChangeText={value => handlers.setFormValue('gstNumber', value)}
            placeholderTextColor={styles.placeholder.color}
            style={styles.inputWrapper}
            inputStyle={styles.inputText}
            leftIcon={renderIconBubble(BadgeIndianRupee)}
          />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <AppText
              semibold
              label="Meeting Details"
              style={styles.sectionTitle}
            />
          </View>

          <AppInput
            value={form.invitationMeetingDate}
            placeholder="Invitation Meeting Date"
            editable={false}
            onPress={handlers.onDatePress}
            placeholderTextColor={styles.placeholder.color}
            style={styles.inputWrapper}
            inputStyle={styles.inputText}
            leftIcon={renderIconBubble(Calendar)}
          />

          <AppInput
            value={form.chapterName}
            placeholder="Chapter Name"
            editable={false}
            onPress={handlers.onChapterPress}
            placeholderTextColor={styles.placeholder.color}
            style={styles.inputWrapper}
            inputStyle={styles.inputText}
            leftIcon={renderIconBubble(Building2)}
            rightElement={
              <ChevronDown
                width={styles.dropdownIcon.width}
                height={styles.dropdownIcon.height}
                color={styles.dropdownIcon.color}
              />
            }
          />
        </View>

        <AppButton
          title="Confirm"
          disabled={!states.canSubmit}
          onPress={handlers.onSubmit}
          style={styles.confirmButton}
          labelStyle={styles.confirmButtonText}
        />
      </View>
    </AppContainer>
  );
};
