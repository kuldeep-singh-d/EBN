import React from 'react';
import useMembers from './useMembers';
import { X } from 'lucide-react-native';
import { AppContainer, AppText } from '@components';
import MemberDetail from './components/MemberDetail';
import GlobalSearchForm from './components/GlobalSearchForm';
import MemberListContent from './components/MemberListContent';
import { GestureResponderEvent, Pressable, View } from 'react-native';

export const Members = () => {
  const { styles, states, handlers } = useMembers();
  const { activeTab, screenData } = states;

  const handleClearGlobalSearch = (event: GestureResponderEvent) => {
    event.stopPropagation();
    handlers.onBackToMemberList();
  };

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
      headerStyle={styles.header}
      contentStyle={styles.content}
      headerTitleStyle={styles.headerTitle}
      onBackPress={handlers.onHeaderBackPress}
      headerIconColor={String(styles.headerIcon.color)}
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
                const showClearIcon =
                  tab.key === 'otherMember' && states.isGlobalResultView;

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
                      style={[
                        styles.tabText,
                        showClearIcon && styles.tabTextWithClear,
                        isActive && styles.activeTabText,
                      ]}
                    />
                    {showClearIcon ? (
                      <Pressable
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Clear global search"
                        onPress={handleClearGlobalSearch}
                        style={styles.tabClearButton}
                      >
                        <X
                          width={styles.tabClearIcon.width}
                          height={styles.tabClearIcon.height}
                          color={styles.tabClearIcon.color}
                        />
                      </Pressable>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            {activeTab === 'chapterRoster' ? (
              <MemberListContent
                title="Chapter Member"
                hasNextPage={states.hasNextPage}
                members={states.filteredMembers}
                searchValue={states.rosterQuery}
                isRefreshing={states.isRefreshing}
                count={states.filteredMembers.length}
                onMemberPress={handlers.onMemberPress}
                onSearchChange={handlers.setRosterQuery}
                isInitialLoading={states.isInitialLoading}
                onRefresh={handlers.refreshChapterMembers}
                isFetchingNextPage={states.isFetchingNextPage}
                onFetchNext={handlers.fetchNextChapterMembers}
                searchPlaceholder="Search by name, speciality..."
                emptyDescription="Try another name, company, or speciality."
              />
            ) : states.isGlobalResultView ? (
              <MemberListContent
                title="Global Search Results"
                members={states.globalMembers}
                count={states.globalMembers.length}
                hasNextPage={states.globalHasNextPage}
                onMemberPress={handlers.onMemberPress}
                isRefreshing={states.isGlobalRefreshing}
                onRefresh={handlers.refreshGlobalMembers}
                onFetchNext={handlers.fetchNextGlobalMembers}
                isInitialLoading={states.isGlobalInitialLoading}
                isFetchingNextPage={states.isGlobalFetchingNextPage}
                emptyDescription="Try updating your global search criteria."
              />
            ) : (
              <GlobalSearchForm
                canClear={states.canClear}
                criteria={states.criteria}
                canSearch={states.canSearch}
                onClear={handlers.resetCriteria}
                onSearch={handlers.onSearchPress}
                onChange={handlers.setCriteriaValue}
              />
            )}
          </>
        )}
      </View>
    </AppContainer>
  );
};
