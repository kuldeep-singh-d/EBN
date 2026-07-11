import React from 'react';
import { Image, Pressable, ScrollView, TextInput, View } from 'react-native';

import { AppButton, AppContainer, AppText } from '@components';
import useMembers from './useMembers';
import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ChevronRight,
  Search,
} from 'lucide-react-native';
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
      <View style={styles.avatarShell}>
        <Image source={member.avatar} style={styles.avatar} />
      </View>
      <View style={styles.memberInfo}>
        <AppText semibold label={member.name} style={styles.memberName} />
        <View style={styles.memberMetaRow}>
          <Building2
            width={styles.memberMetaIcon.width}
            height={styles.memberMetaIcon.height}
            color={styles.memberMetaIcon.color}
          />
          <AppText
            numberOfLines={1}
            label={member.company}
            style={styles.memberMeta}
          />
        </View>
        <View style={styles.memberSpecialtyPill}>
          <BriefcaseBusiness
            width={styles.specialtyIcon.width}
            height={styles.specialtyIcon.height}
            color={styles.specialtyIcon.color}
          />
          <AppText
            medium
            numberOfLines={1}
            label={member.specialty}
            style={styles.memberSpecialty}
          />
        </View>
      </View>
      <ChevronRight
        width={styles.memberChevron.width}
        height={styles.memberChevron.height}
        color={styles.memberChevron.color}
      />
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
                style={[styles.tab, isActive && styles.activeTab]}
              >
                <AppText
                  semibold={isActive}
                  centered
                  label={tab.label}
                  style={[styles.tabText, isActive && styles.activeTabText]}
                />
              </Pressable>
            );
          })}
        </View>

        {activeTab === 'chapterRoster' ? (
          <View style={styles.rosterContainer}>
            <View style={styles.searchPanel}>
              <View style={styles.rosterSummary}>
                <AppText
                  semibold
                  label="Chapter Roster"
                  style={styles.rosterTitle}
                />
                <AppText
                  label={`${states.filteredMembers.length} members`}
                  style={styles.rosterCount}
                />
              </View>
              <View style={styles.searchBox}>
                <Search
                  width={styles.searchIcon.width}
                  height={styles.searchIcon.height}
                  color={styles.searchIcon.color}
                />
                <TextInput
                  value={states.rosterQuery}
                  placeholder="Search by name, speciality..."
                  placeholderTextColor={styles.placeholder.color}
                  cursorColor={styles.inputText.color}
                  selectionColor={styles.inputText.color}
                  onChangeText={handlers.setRosterQuery}
                  style={[styles.searchInput, styles.inputText]}
                />
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.memberList}
            >
              {states.filteredMembers.length ? (
                states.filteredMembers.map(renderMember)
              ) : (
                <View style={styles.emptyState}>
                  <AppText
                    semibold
                    centered
                    label="No members found"
                    style={styles.emptyTitle}
                  />
                  <AppText
                    centered
                    label="Try another name, company, or speciality."
                    style={styles.emptyText}
                  />
                </View>
              )}
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
                <ChevronDown
                  width={styles.downIcon.width}
                  height={styles.downIcon.height}
                  color={styles.downIcon.color}
                />
              </Pressable>
              <View style={styles.fieldRow}>
                {LOCATION_FIELDS.map(renderInput)}
              </View>
            </View>

            <AppButton
              title="Search"
              topMargin={0.6}
              disabled={!states.canSearch}
              onPress={handlers.onSearchPress}
              style={styles.searchButton}
              labelStyle={styles.searchButtonText}
            />
          </ScrollView>
        )}
      </View>
    </AppContainer>
  );
};
