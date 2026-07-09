import React from 'react';
import { View } from 'react-native';

import { AppButton, AppContainer, AppInput } from '@components';
import {
  Calendar,
  ChevronDown,
  TicketCheck,
  type LucideIcon,
} from 'lucide-react-native';
import useVisitors from './useVisitors';

export const Visitors = () => {
  const { styles, states, handlers } = useVisitors();
  const { form, title } = states.screenData;

  const renderIconBubble = (Icon: LucideIcon) => (
    <View style={styles.iconBubble}>
      <Icon
        width={styles.fieldIcon.width}
        height={styles.fieldIcon.height}
        color={styles.fieldIcon.color}
      />
    </View>
  );

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
        <AppInput
          value={form.firstName}
          placeholder="FirstName"
          autoCapitalize="words"
          onChangeText={value => handlers.setFormValue('firstName', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
          rightElement={renderIconBubble(TicketCheck)}
        />

        <AppInput
          value={form.lastName}
          placeholder="Last Name"
          autoCapitalize="words"
          onChangeText={value => handlers.setFormValue('lastName', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
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
        />

        <AppInput
          value={form.whatsappNumber}
          placeholder="WhatsApp Number"
          keyboardType="phone-pad"
          onChangeText={value => handlers.setFormValue('whatsappNumber', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
        />

        <AppInput
          value={form.companyName}
          placeholder="Company Name"
          autoCapitalize="words"
          onChangeText={value => handlers.setFormValue('companyName', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
        />

        <AppInput
          value={form.gstNumber}
          placeholder="GST Number"
          autoCapitalize="characters"
          onChangeText={value => handlers.setFormValue('gstNumber', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
        />

        <AppInput
          value={form.invitationMeetingDate}
          placeholder="Invitation Meeting Date"
          editable={false}
          onPress={handlers.onDatePress}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
          rightElement={renderIconBubble(Calendar)}
        />

        <AppInput
          value={form.chapterName}
          placeholder="Chapter Name"
          editable={false}
          onPress={handlers.onChapterPress}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
          rightElement={
            <ChevronDown
              width={styles.dropdownIcon.width}
              height={styles.dropdownIcon.height}
              color={styles.dropdownIcon.color}
            />
          }
        />

        <AppButton
          title="CONFIRM"
          gradient={false}
          disabled={!states.canSubmit}
          onPress={handlers.onSubmit}
          style={[
            styles.confirmButton,
            !states.canSubmit && styles.confirmButtonDisabled,
          ]}
          labelStyle={styles.confirmButtonText}
        />
      </View>
    </AppContainer>
  );
};
