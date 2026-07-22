import React, { SetStateAction } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  Circle,
  UserRound,
  UsersRound,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import { images } from '@assets/images';
import { AppContainer, AppDatePicker, AppInput, AppText } from '@components';
import useProfile from './useProfile';
import type { ProfileFormData, ProfileSectionKey } from './types';

type FieldKey = keyof ProfileFormData;

type ProfileFieldProps = {
  field: FieldKey;
  label: string;
  value: string;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric' | 'url';
  placeholder?: string;
  secureTextEntry?: boolean;
  onChange: (field: FieldKey, value: string) => void;
  setError: (field: FieldKey, value: SetStateAction<string>) => void;
};

type ProfileTextAreaProps = {
  field: FieldKey;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (field: FieldKey, value: string) => void;
};

type ProfileDateFieldProps = {
  field: 'dob' | 'anniversary_date';
  label: string;
  value: Date | null;
  error?: string;
  onChange: (field: FieldKey, value: Date | null) => void;
  setError: (field: FieldKey, value: SetStateAction<string>) => void;
  onClear: (field: 'dob' | 'anniversary_date') => void;
};

type ProfileToggleProps = {
  field: FieldKey;
  label: string;
  value: boolean;
  onChange: (field: FieldKey, value: boolean) => void;
};

type ReadOnlyItemProps = {
  label: string;
  value?: string | number | null;
};

const getAvatarSource = (avatar?: string | null): ImageSourcePropType =>
  avatar ? { uri: avatar } : images.profilePlaceholder;

export const Profile = () => {
  const { styles, colors, states, handlers } = useProfile();
  const { form, errors, profile } = states;

  const onTextChange = (field: FieldKey, value: string) => {
    handlers.setFormValue(field, value);
  };

  const onToggleChange = (field: FieldKey, value: boolean) => {
    handlers.setFormValue(field, value);
  };

  const setFieldError = (field: FieldKey, value: SetStateAction<string>) => {
    handlers.setFieldError(field, value);
  };

  const renderStepTabs = () => (
    <View style={styles.stepTabs}>
      {states.sectionTabs.map(tab => {
        const isActive = states.activeSection === tab.key;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => handlers.setActiveSection(tab.key)}
            style={[styles.stepTab, isActive && styles.stepTabActive]}
          >
            <AppText
              semibold={isActive}
              centered
              numberOfLines={1}
              label={tab.label}
              style={[styles.stepTabText, isActive && styles.stepTabTextActive]}
            />
          </Pressable>
        );
      })}
    </View>
  );

  const renderSectionHeader = (
    title: string,
    subtitle: string,
    Icon: LucideIcon,
  ) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderIcon}>
        <Icon
          width={styles.sectionHeaderGlyph.width}
          height={styles.sectionHeaderGlyph.height}
          color={styles.sectionHeaderGlyph.color}
        />
      </View>
      <View style={styles.sectionHeaderBody}>
        <AppText semibold label={title} style={styles.sectionTitle} />
        <AppText label={subtitle} style={styles.sectionSubtitle} />
      </View>
    </View>
  );

  const renderAvatarCard = () => (
    <View style={styles.avatarCard}>
      <Image
        source={getAvatarSource(profile.avatar)}
        style={styles.avatar}
        resizeMode="cover"
      />
      <View style={styles.avatarBody}>
        <AppText
          semibold
          numberOfLines={1}
          label={form.name || 'Member Profile'}
          style={styles.avatarName}
        />
        <AppText
          numberOfLines={1}
          label={form.company_name || form.brand_name || 'Business profile'}
          style={styles.avatarMeta}
        />
        <View style={styles.avatarBadge}>
          <BadgeCheck
            width={styles.avatarBadgeIcon.width}
            height={styles.avatarBadgeIcon.height}
            color={styles.avatarBadgeIcon.color}
          />
          <AppText label="Elite Member" style={styles.avatarBadgeText} />
        </View>
      </View>
    </View>
  );

  const renderField = ({
    field,
    label,
    value,
    error,
    keyboardType,
    placeholder,
    secureTextEntry,
    onChange,
    setError,
  }: ProfileFieldProps) => (
    <AppInput
      title={label}
      value={value}
      error={error}
      keyboardType={keyboardType}
      placeholder={placeholder}
      isPassword={secureTextEntry}
      showPasswordToggle={Boolean(secureTextEntry)}
      placeholderTextColor={String(colors.gray)}
      style={styles.inputWrapper}
      inputStyle={styles.inputText}
      onChangeText={text => onChange(field, text)}
      setError={value => setError(field, value)}
    />
  );

  const renderTextArea = ({
    field,
    label,
    value,
    placeholder,
    onChange,
  }: ProfileTextAreaProps) => (
    <View style={styles.textAreaBlock}>
      <AppText medium label={label} style={styles.fieldLabel} />
      <TextInput
        multiline
        value={value}
        textAlignVertical="top"
        placeholder={placeholder}
        cursorColor={colors.text}
        selectionColor={colors.primary}
        autoCapitalize="sentences"
        placeholderTextColor={String(colors.gray)}
        onChangeText={text => onChange(field, text)}
        style={styles.textArea}
      />
    </View>
  );

  const renderDateField = ({
    field,
    label,
    value,
    error,
    onChange,
    setError,
    onClear,
  }: ProfileDateFieldProps) => (
    <AppDatePicker
      title={label}
      value={value ?? undefined}
      error={error}
      mode="date"
      maximumDate={new Date()}
      wrapperStyle={styles.dateWrapper}
      style={styles.inputWrapper}
      displayStyle={styles.dateText}
      leftIcon={
        <CalendarDays
          width={styles.dateIcon.width}
          height={styles.dateIcon.height}
          color={styles.dateIcon.color}
        />
      }
      setError={value => setError(field, value)}
      onChangeDate={date => onChange(field, date)}
      handleClearInput={() => onClear(field)}
    />
  );

  const renderToggle = ({
    field,
    label,
    value,
    onChange,
  }: ProfileToggleProps) => (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
      onPress={() => onChange(field, !value)}
      style={({ pressed }) => [
        styles.toggleRow,
        pressed && styles.controlPressed,
      ]}
    >
      <View style={[styles.checkbox, value && styles.checkboxActive]}>
        {value ? (
          <Check
            width={styles.checkboxIcon.width}
            height={styles.checkboxIcon.height}
            color={styles.checkboxIcon.color}
          />
        ) : null}
      </View>
      <AppText semibold label={label} style={styles.toggleText} />
    </Pressable>
  );

  const renderReadOnlyItem = ({ label, value }: ReadOnlyItemProps) => (
    <View style={styles.readonlyItem}>
      <AppText label={label} style={styles.readonlyLabel} />
      <AppText
        semibold
        label={value ? String(value) : 'N/A'}
        style={styles.readonlyValue}
      />
    </View>
  );

  const renderBasicSection = () => (
    <View style={styles.sectionCard}>
      {renderSectionHeader(
        'Basic Account Credentials',
        'Account, contact, personal and family details',
        UserRound,
      )}

      {renderField({
        field: 'name',
        label: 'Full Name *',
        value: form.name,
        error: errors.name,
        placeholder: 'Full name',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'phone',
        label: 'Mobile Number *',
        value: form.phone,
        error: errors.phone,
        keyboardType: 'phone-pad',
        placeholder: 'Mobile number',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'email',
        label: 'Email Address *',
        value: form.email,
        error: errors.email,
        keyboardType: 'email-address',
        placeholder: 'Email address',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'password',
        label: 'New Password',
        value: form.password,
        secureTextEntry: true,
        placeholder: 'Leave blank to keep current password',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'whatsapp',
        label: 'WhatsApp Number',
        value: form.whatsapp,
        keyboardType: 'phone-pad',
        placeholder: 'WhatsApp number',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderDateField({
        field: 'dob',
        label: 'Date of Birth',
        value: form.dob,
        error: errors.dob,
        onChange: handlers.setFormValue,
        setError: setFieldError,
        onClear: handlers.clearDate,
      })}
      {renderTextArea({
        field: 'residential_address',
        label: 'Residential Address',
        value: form.residential_address,
        placeholder: 'Residential address',
        onChange: onTextChange,
      })}

      <View style={styles.inlineDivider} />

      {renderField({
        field: 'academic_qualification',
        label: 'Academic Qualification',
        value: form.academic_qualification,
        placeholder: 'e.g. B.Tech, MBA',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderDateField({
        field: 'anniversary_date',
        label: 'Anniversary Date',
        value: form.anniversary_date,
        error: errors.anniversary_date,
        onChange: handlers.setFormValue,
        setError: setFieldError,
        onClear: handlers.clearDate,
      })}
      {renderField({
        field: 'spouse_name',
        label: 'Spouse Name',
        value: form.spouse_name,
        placeholder: 'Spouse name',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'spouse_profession',
        label: 'Spouse Profession',
        value: form.spouse_profession,
        placeholder: 'Spouse profession',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderTextArea({
        field: 'kids_details',
        label: 'Kids Details',
        value: form.kids_details,
        placeholder: 'Names and ages of kids',
        onChange: onTextChange,
      })}
    </View>
  );

  const renderBusinessSection = () => (
    <View style={styles.sectionCard}>
      {renderSectionHeader(
        'Business Dossier Information',
        'Company profile, markets and referral readiness',
        BriefcaseBusiness,
      )}

      {renderField({
        field: 'brand_name',
        label: 'Business Brand Name',
        value: form.brand_name,
        placeholder: 'Brand name',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'company_name',
        label: 'Company Legal Entity',
        value: form.company_name,
        placeholder: 'Company name',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'gst_number',
        label: 'GST Number',
        value: form.gst_number,
        placeholder: 'e.g. 24ABCDE1234F1Z5',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'website',
        label: 'Website URL',
        value: form.website,
        keyboardType: 'url',
        placeholder: 'https://example.com',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'years_in_business',
        label: 'Years in Business',
        value: form.years_in_business,
        keyboardType: 'numeric',
        placeholder: 'e.g. 5',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'pincode',
        label: 'Pincode',
        value: form.pincode,
        keyboardType: 'numeric',
        placeholder: 'Pincode',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'city',
        label: 'City',
        value: form.city,
        placeholder: 'City',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderTextArea({
        field: 'office_address',
        label: 'Office Address',
        value: form.office_address,
        placeholder: 'Office address',
        onChange: onTextChange,
      })}
      {renderField({
        field: 'office_ownership',
        label: 'Office Ownership',
        value: form.office_ownership,
        placeholder: 'Owned / Rented / Other',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'employees',
        label: 'Employees',
        value: form.employees,
        keyboardType: 'numeric',
        placeholder: 'e.g. 10',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'annual_turnover',
        label: 'Annual Turnover (Rs. Lakhs)',
        value: form.annual_turnover,
        keyboardType: 'numeric',
        placeholder: 'e.g. 50',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'monthly_avg_business',
        label: 'Monthly Avg Business (Rs.)',
        value: form.monthly_avg_business,
        keyboardType: 'numeric',
        placeholder: 'e.g. 300000',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'target_customers',
        label: 'Target Customers / Primary Keywords',
        value: form.target_customers,
        placeholder: 'Corporates, SMBs, startups',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderField({
        field: 'geographical_area',
        label: 'Geographical Area',
        value: form.geographical_area,
        placeholder: 'Western Gujarat, India',
        onChange: onTextChange,
        setError: setFieldError,
      })}
      {renderTextArea({
        field: 'top_5_ideal_clients',
        label: 'Top 5 Ideal Clients',
        value: form.top_5_ideal_clients,
        placeholder: 'List your top 5 ideal target clients',
        onChange: onTextChange,
      })}
      {renderTextArea({
        field: 'nature_of_business',
        label: 'My Burning Desire / Nature of Business',
        value: form.nature_of_business,
        placeholder: 'Nature of business',
        onChange: onTextChange,
      })}
      {renderTextArea({
        field: 'referrals_looking_for',
        label: "Referrals I'm Looking For",
        value: form.referrals_looking_for,
        placeholder: 'Type of referrals you seek',
        onChange: onTextChange,
      })}
      {renderTextArea({
        field: 'categories_max_business',
        label: 'Categories of Max Business',
        value: form.categories_max_business,
        placeholder: 'Manufacturing, real estate, services',
        onChange: onTextChange,
      })}
    </View>
  );

  const renderNetworkSection = () => (
    <>
      <View style={styles.sectionCard}>
        {renderSectionHeader(
          'Networking Information',
          'Capacity, team details and business declarations',
          UsersRound,
        )}

        {renderToggle({
          field: 'has_sales_team',
          label: 'Has dedicated sales team?',
          value: form.has_sales_team,
          onChange: onToggleChange,
        })}
        {renderField({
          field: 'sales_team_count',
          label: 'Sales Team Count',
          value: form.sales_team_count,
          keyboardType: 'numeric',
          placeholder: 'e.g. 5',
          onChange: onTextChange,
          setError: setFieldError,
        })}
        {renderField({
          field: 'referrals_monthly_capacity',
          label: 'Referrals Monthly Capacity',
          value: form.referrals_monthly_capacity,
          keyboardType: 'numeric',
          placeholder: 'e.g. 10',
          onChange: onTextChange,
          setError: setFieldError,
        })}
        {renderToggle({
          field: 'has_client_database',
          label: 'Has customer database?',
          value: form.has_client_database,
          onChange: onToggleChange,
        })}
        {renderField({
          field: 'previous_network_name',
          label: 'Other Business Network Name',
          value: form.previous_network_name,
          placeholder: 'Previous or current network',
          onChange: onTextChange,
          setError: setFieldError,
        })}
        {renderToggle({
          field: 'past_disputes',
          label: 'Has any past business disputes?',
          value: form.past_disputes,
          onChange: onToggleChange,
        })}
        {renderTextArea({
          field: 'disputes_description',
          label: 'Disputes Description',
          value: form.disputes_description,
          placeholder: 'Describe business disputes',
          onChange: onTextChange,
        })}
      </View>

      <View style={styles.sectionCard}>
        {renderSectionHeader(
          'Chapter Seat Details',
          'Read-only membership information',
          Building2,
        )}
        {renderReadOnlyItem({
          label: 'Primary Chapter ID',
          value: profile.primary_chapter_id,
        })}
        {renderReadOnlyItem({
          label: 'Business Sub-Category Seat',
          value: 'N/A',
        })}
        {renderReadOnlyItem({ label: 'Induction Date', value: 'N/A' })}
        {renderReadOnlyItem({ label: 'Renewal Date', value: 'N/A' })}
      </View>
    </>
  );

  const renderActiveSection = (section: ProfileSectionKey) => {
    switch (section) {
      case 'business':
        return renderBusinessSection();
      case 'network':
        return renderNetworkSection();
      default:
        return renderBasicSection();
    }
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      {!states.isFirstSection ? (
        <Pressable
          accessibilityRole="button"
          onPress={handlers.onBack}
          style={({ pressed }) => [
            styles.footerSecondaryButton,
            pressed && styles.controlPressed,
          ]}
        >
          <ArrowLeft
            width={styles.footerIcon.width}
            height={styles.footerIcon.height}
            color={styles.footerSecondaryText.color}
          />
          <AppText semibold label="Back" style={styles.footerSecondaryText} />
        </Pressable>
      ) : (
        <View style={styles.footerSpacer} />
      )}

      {states.isLastSection ? (
        <Pressable
          accessibilityRole="button"
          disabled={states.updateLoading}
          onPress={handlers.onSave}
          style={({ pressed }) => [
            styles.footerPrimaryButton,
            states.updateLoading && styles.footerDisabledButton,
            pressed && styles.controlPressed,
          ]}
        >
          {states.updateLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <>
              <Check
                width={styles.footerIcon.width}
                height={styles.footerIcon.height}
                color={styles.footerPrimaryText.color}
              />
              <AppText
                semibold
                label="Save Profile"
                style={styles.footerPrimaryText}
              />
            </>
          )}
        </Pressable>
      ) : (
        <Pressable
          accessibilityRole="button"
          onPress={handlers.onNext}
          style={({ pressed }) => [
            styles.footerPrimaryButton,
            pressed && styles.controlPressed,
          ]}
        >
          <AppText
            semibold
            label={
              states.activeSection === 'basic'
                ? 'Continue to Business'
                : 'Continue to Network'
            }
            style={styles.footerPrimaryText}
          />
          <ArrowRight
            width={styles.footerIcon.width}
            height={styles.footerIcon.height}
            color={styles.footerPrimaryText.color}
          />
        </Pressable>
      )}
    </View>
  );

  return (
    <AppContainer
      centerTitle
      title="PROFILE"
      showHeaderActions={false}
      loading={states.profileLoading && !profile.id}
      contentStyle={styles.content}
    >
      <View style={styles.container}>
        {renderAvatarCard()}
        {renderStepTabs()}
        {renderActiveSection(states.activeSection)}

        <View style={styles.tipCard}>
          <Circle
            width={styles.tipIcon.width}
            height={styles.tipIcon.height}
            color={styles.tipIcon.color}
            fill={String(styles.tipIcon.color)}
          />
          <View style={styles.tipBody}>
            <AppText semibold label="Profile update" style={styles.tipTitle} />
            <AppText
              label="Only changed fields will be submitted."
              style={styles.tipText}
            />
          </View>
        </View>

        {renderFooter()}
      </View>
    </AppContainer>
  );
};
