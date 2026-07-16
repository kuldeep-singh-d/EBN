import React from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { AppButton, AppText } from '@components';
import useStyles from '../styles';
import type { MemberSearchCriteria } from '../types';

type FieldConfig = {
  key: keyof MemberSearchCriteria;
  placeholder: string;
};

type GlobalSearchFormProps = {
  canSearch: boolean;
  criteria: MemberSearchCriteria;
  onChange: (key: keyof MemberSearchCriteria, value: string) => void;
  onSearch: () => void;
};

const GLOBAL_SEARCH_FIELDS: FieldConfig[] = [
  { key: 'search', placeholder: 'Member Name/Email Address' },
  { key: 'company_name', placeholder: 'Company Name' },
  { key: 'brand_name', placeholder: 'Brand Name' },
  { key: 'nature_of_business', placeholder: 'Nature of Business' },
];

const GlobalSearchForm = ({
  canSearch,
  criteria,
  onChange,
  onSearch,
}: GlobalSearchFormProps) => {
  const styles = useStyles();

  const renderInput = ({ key, placeholder }: FieldConfig) => (
    <TextInput
      key={key}
      value={criteria[key]}
      placeholder={placeholder}
      placeholderTextColor={styles.placeholder.color}
      cursorColor={styles.inputText.color}
      selectionColor={styles.inputText.color}
      onChangeText={value => onChange(key, value)}
      style={[styles.input, styles.inputText]}
    />
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.formContent}
    >
      <AppText
        centered
        numberOfLines={3}
        label="Please enter your search criteria below. The search button will be enabled when your search parameters are specific enough."
        style={styles.instructions}
      />

      <View style={styles.formCard}>
        <AppText
          semibold
          centered
          label="Global Search"
          style={styles.formTitle}
        />
        {GLOBAL_SEARCH_FIELDS.map(renderInput)}
      </View>

      <AppButton
        title="Search"
        topMargin={0.6}
        disabled={!canSearch}
        onPress={onSearch}
        style={styles.searchButton}
        labelStyle={styles.searchButtonText}
      />
    </ScrollView>
  );
};

export default GlobalSearchForm;
