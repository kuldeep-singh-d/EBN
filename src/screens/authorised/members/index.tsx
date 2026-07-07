import React from 'react';
import { Image, Pressable, ScrollView, TextInput, View } from 'react-native';

import { AppContainer, AppText } from '@components';
import { Svgs } from '@assets/svgs';
import useMembers from './useMembers';
import type { MemberProfile, MemberSearchCriteria } from './types';

type FieldConfig = {
  key: keyof MemberSearchCriteria;
  placeholder: string;
  style?: object;
};

const DETAIL_FIELDS: FieldConfig[] = [
  { key: 'firstName', placeholder: 'FirstName', style: { flex: 1 } },
  { key: 'lastName', placeholder: 'Last Name', style: { flex: 1 } },
  { key: 'company', placeholder: 'Company' },
];

const LOCATION_FIELDS: FieldConfig[] = [
  { key: 'city', placeholder: 'City', style: { flex: 1 } },
  { key: 'state', placeholder: 'State', style: { flex: 1 } },
];

export const Members = () => {
  const { styles, states, handlers } = useMembers();
  const { activeTab, criteria, screenData } = states;

  const renderInput = ({ key, placeholder, style }: FieldConfig) => (
    <TextInput
      key={key}
      value={criteria[key]}
      placeholder={placeholder}
      placeholderTextColor={styles.placeholder.color}
      cursorColor={styles.inputText.color}
      selectionColor={styles.inputText.color}
      onChangeText={value => handlers.setCriteriaValue(key, value)}
      style={[styles.input, styles.inputText, style]}
    />
  );

  const renderMember = (member: MemberProfile) => (
    <Pressable
      key={member.id}
      accessibilityRole="button"
      onPress={() => handlers.onMemberPress(member.id)}
      style={({ pressed }) => [
        styles.memberCard,
        pressed && styles.memberCardPressed,
      ]}
    >
      <Image source={member.avatar} style={styles.avatar} />
      <View style={styles.memberInfo}>
        <AppText semibold label={member.name} style={styles.memberName} />
        <AppText label={member.company} style={styles.memberMeta} />
        <AppText label={member.specialty} style={styles.memberMeta} />
      </View>
      <AppText label="›" style={styles.memberChevron} />
    </Pressable>
  );

  return (
    <AppContainer
      listing
      centerTitle
      hideBackBtn
      title={screenData.title}
      showHeaderActions={false}
      headerStyle={styles.header}
      contentStyle={styles.content}
      headerTitleStyle={styles.headerTitle}
    >
      <View style={styles.container}>
        <View style={styles.tabs}>
          {screenData.tabs.map(tab => {
            const isActive = activeTab === tab.key;

            return (
              <Pressable
                key={tab.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                onPress={() => handlers.setActiveTab(tab.key)}
                style={styles.tab}
              >
                <AppText
                  semibold={isActive}
                  centered
                  label={tab.label}
                  style={[styles.tabText, isActive && styles.activeTabText]}
                />
                {isActive ? <View style={styles.activeTabLine} /> : null}
              </Pressable>
            );
          })}
        </View>

        {activeTab === 'chapterRoster' ? (
          <View style={styles.rosterContainer}>
            <View style={styles.searchPanel}>
              <TextInput
                value={states.rosterQuery}
                placeholder="Search By Name, Speciality..."
                placeholderTextColor={styles.placeholder.color}
                cursorColor={styles.inputText.color}
                selectionColor={styles.inputText.color}
                onChangeText={handlers.setRosterQuery}
                style={[styles.searchInput, styles.inputText]}
              />
              <View pointerEvents="none" style={styles.searchIconWrap}>
                <Svgs.Search
                  width={styles.searchIcon.width}
                  height={styles.searchIcon.height}
                  color={styles.searchIcon.color}
                />
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.memberList}
            >
              {states.filteredMembers.map(renderMember)}
            </ScrollView>
          </View>
        ) : (
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
                label="Member Details"
                style={styles.formTitle}
              />
              <View style={styles.fieldRow}>
                {DETAIL_FIELDS.slice(0, 2).map(renderInput)}
              </View>
              {renderInput(DETAIL_FIELDS[2])}
            </View>

            <View style={styles.formCard}>
              <AppText
                semibold
                centered
                label="Keyword"
                style={styles.formTitle}
              />
              {renderInput({ key: 'keyword', placeholder: 'Keyword' })}
            </View>

            <View style={styles.formCard}>
              <AppText
                semibold
                centered
                label="Location"
                style={styles.formTitle}
              />
              <Pressable
                accessibilityRole="button"
                onPress={handlers.onCountryPress}
                style={styles.countryInput}
              >
                <AppText
                  semibold={Boolean(criteria.country)}
                  label={criteria.country || 'Select Country'}
                  style={[
                    styles.countryText,
                    !criteria.country && styles.placeholder,
                  ]}
                />
                <Svgs.DownArrow
                  width={styles.downIcon.width}
                  height={styles.downIcon.height}
                  color={styles.downIcon.color}
                />
              </Pressable>
              <View style={styles.fieldRow}>
                {LOCATION_FIELDS.map(renderInput)}
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              disabled={!states.canSearch}
              onPress={handlers.onSearchPress}
              style={[
                styles.searchButton,
                !states.canSearch && styles.searchButtonDisabled,
              ]}
            >
              <AppText
                semibold
                centered
                label="Search"
                style={styles.searchButtonText}
              />
            </Pressable>
          </ScrollView>
        )}
      </View>
    </AppContainer>
  );
};
