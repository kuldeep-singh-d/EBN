import React from 'react';
import { View } from 'react-native';
import {
  BadgeIndianRupee,
  Building2,
  Calendar,
  ChevronDown,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react-native';

import {
  AppButton,
  AppDatePicker,
  AppDropdown,
  AppInput,
  AppText,
} from '@components';
import IconBubble from '../components/IconBubble';
import useVisitorCreate from '../hooks/useVisitorCreate';
import useStyles from '../styles';

type VisitorCreateProps = {
  onCreated: () => void;
};

const VisitorCreate = ({ onCreated }: VisitorCreateProps) => {
  const styles = useStyles();
  const { states, handlers } = useVisitorCreate(onCreated);
  const { form } = states;

  const renderDropdownIcon = () => (
    <ChevronDown
      width={styles.dropdownIcon.width}
      height={styles.dropdownIcon.height}
      color={styles.dropdownIcon.color}
    />
  );

  return (
    <View style={styles.form}>
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
          value={form.fullName}
          error={states.errors.fullName}
          placeholder="Full Name *"
          autoCapitalize="words"
          setError={value => handlers.setFieldError('fullName', value)}
          onChangeText={value => handlers.setFormValue('fullName', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
          leftIcon={<IconBubble Icon={UserRound} />}
        />

        <AppInput
          value={form.mobileNumber}
          error={states.errors.mobileNumber}
          placeholder="Mobile Number *"
          keyboardType="phone-pad"
          maxLength={10}
          isContactNumber
          setError={value => handlers.setFieldError('mobileNumber', value)}
          onChangeText={value => handlers.setFormValue('mobileNumber', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
          leftIcon={<IconBubble Icon={Phone} />}
        />

        <AppInput
          value={form.whatsappNumber}
          error={states.errors.whatsappNumber}
          placeholder="WhatsApp Number"
          keyboardType="phone-pad"
          maxLength={10}
          isContactNumber
          setError={value => handlers.setFieldError('whatsappNumber', value)}
          onChangeText={value => handlers.setFormValue('whatsappNumber', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
          leftIcon={<IconBubble Icon={Phone} />}
        />

        <AppInput
          value={form.email}
          error={states.errors.email}
          placeholder="Email *"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          setError={value => handlers.setFieldError('email', value)}
          onChangeText={value => handlers.setFormValue('email', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
          leftIcon={<IconBubble Icon={Mail} />}
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
          leftIcon={<IconBubble Icon={Building2} />}
        />

        <AppInput
          value={form.gstNumber}
          placeholder="GST Number"
          autoCapitalize="characters"
          onChangeText={value => handlers.setFormValue('gstNumber', value)}
          placeholderTextColor={styles.placeholder.color}
          style={styles.inputWrapper}
          inputStyle={styles.inputText}
          leftIcon={<IconBubble Icon={BadgeIndianRupee} />}
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

        <AppDatePicker
          value={form.invitationDate ?? undefined}
          error={states.errors.invitationDate}
          placeholder="Invitation Date *"
          minimumDate={new Date()}
          setError={value => handlers.setFieldError('invitationDate', value)}
          onChangeDate={handlers.setInvitationDate}
          handleClearInput={handlers.clearInvitationDate}
          wrapperStyle={styles.dropdownWrapper}
          style={styles.inputWrapper}
          displayStyle={styles.selectText}
          leftIcon={<IconBubble Icon={Calendar} />}
        />

        <AppDropdown
          itemList={states.categoryOptions}
          selectedValue={states.selectedCategory}
          error={states.errors.categoryId}
          loading={states.categoryLoading}
          placeholder="Chapter *"
          emptyLabel="No chapters found"
          wrapperStyle={styles.dropdownWrapper}
          style={styles.inputWrapper}
          labelStyle={styles.selectText}
          placeholderStyle={styles.selectText}
          leftIcon={<IconBubble Icon={Building2} />}
          rightElement={renderDropdownIcon()}
          onSelectItem={handlers.setCategory}
        />

        <AppDropdown
          itemList={states.subCategoryOptions}
          selectedValue={states.selectedSubCategory}
          error={states.errors.subCategoryId}
          disabled={!states.selectedCategory}
          loading={states.subCategoryLoading}
          placeholder="Sub-Chapter *"
          emptyLabel={
            states.selectedCategory
              ? 'No sub-chapters found'
              : 'Select chapter first'
          }
          wrapperStyle={styles.dropdownWrapper}
          style={styles.inputWrapper}
          labelStyle={styles.selectText}
          placeholderStyle={styles.selectText}
          leftIcon={<IconBubble Icon={Building2} />}
          rightElement={renderDropdownIcon()}
          onSelectItem={handlers.setSubCategory}
        />
      </View>

      <AppButton
        title="Confirm"
        loader={states.createLoading}
        disabled={!states.canSubmit}
        onPress={handlers.onSubmit}
        style={styles.confirmButton}
        labelStyle={styles.confirmButtonText}
      />
    </View>
  );
};

export default VisitorCreate;
