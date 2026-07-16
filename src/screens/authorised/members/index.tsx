import React from 'react';
import { Pressable, View } from 'react-native';

import { AppContainer, AppText } from '@components';
import GlobalSearchForm from './components/GlobalSearchForm';
import MemberDetail from './components/MemberDetail';
import MemberListContent from './components/MemberListContent';
import useMembers from './useMembers';

export const Members = () => {
  const { styles, states, handlers } = useMembers();
  const { activeTab, screenData } = states;

  return (
    <AppContainer
      listing
      centerTitle
      hideBackBtn={!states.isGlobalResultView && !states.isDetailView}
      title={
        states.isDetailView
          ? 'Member Detail'
          : states.isGlobalResultView
          ? 'Global Search Results'
          : screenData.title
      }
      showHeaderActions={false}
      headerIconColor={String(styles.headerIcon.color)}
      onBackPress={handlers.onHeaderBackPress}
      headerStyle={styles.header}
      contentStyle={styles.content}
      headerTitleStyle={styles.headerTitle}
    >
      <View style={styles.container}>
        {states.isDetailView ? (
          <MemberDetail
            detail={states.selectedMember}
            loading={states.isDetailLoading}
          />
        ) : (
          <>
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
              <MemberListContent
                count={states.filteredMembers.length}
                emptyDescription="Try another name, company, or speciality."
                hasNextPage={states.hasNextPage}
                isFetchingNextPage={states.isFetchingNextPage}
                isInitialLoading={states.isInitialLoading}
                isRefreshing={states.isRefreshing}
                members={states.filteredMembers}
                searchPlaceholder="Search by name, speciality..."
                searchValue={states.rosterQuery}
                title="Chapter Member"
                onFetchNext={handlers.fetchNextChapterMembers}
                onMemberPress={handlers.onMemberPress}
                onRefresh={handlers.refreshChapterMembers}
                onSearchChange={handlers.setRosterQuery}
              />
            ) : states.isGlobalResultView ? (
              <MemberListContent
                count={states.globalMembers.length}
                emptyDescription="Try updating your global search criteria."
                hasNextPage={states.globalHasNextPage}
                isFetchingNextPage={states.isGlobalFetchingNextPage}
                isInitialLoading={states.isGlobalInitialLoading}
                isRefreshing={states.isGlobalRefreshing}
                members={states.globalMembers}
                title="Global Search Results"
                onFetchNext={handlers.fetchNextGlobalMembers}
                onMemberPress={handlers.onMemberPress}
                onRefresh={handlers.refreshGlobalMembers}
              />
            ) : (
              <GlobalSearchForm
                canSearch={states.canSearch}
                criteria={states.criteria}
                onChange={handlers.setCriteriaValue}
                onSearch={handlers.onSearchPress}
              />
            )}
          </>
        )}
      </View>
    </AppContainer>
  );
};
