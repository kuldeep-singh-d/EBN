import moment from 'moment';
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  MapPin,
  ReceiptText,
  Search,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import { AppDatePicker, AppDropdown, AppInput, AppText } from '@components';
import type { DropdownItem } from '@components/form/appDropdown/types';
import { useDispatch, useSelector } from '@hooks';
import GlobalSearchForm from '../../members/components/GlobalSearchForm';
import MemberListContent from '../../members/components/MemberListContent';
import type {
  MemberApiRecord,
  MemberProfile,
  MemberSearchCriteria,
  MembersSearchResponse,
  MembersTabKey,
} from '../../members/types';
import {
  resetEliteMemberSearch,
  searchEliteMembers,
} from '@store/slices/app/eliteMembers/eliteMembers';
import {
  createEliteMeet,
  resetEliteMeetCreate,
} from '@store/slices/app/eliteMeets/eliteMeets';
import { show } from '@utils/helpers';
import type useStyles from '../styles';

type MeetSlipFormProps = {
  styles: ReturnType<typeof useStyles>;
  onBackPress: () => void;
  onCreated?: () => void;
};

type ListRequestMode = 'initial' | 'refresh' | 'next';
type MembersRequestContext = 'chapter' | 'global';

type MeetFormData = {
  metAt: Date | null;
  mode: string;
  location: string;
  topicsDiscussed: string;
};

type MeetFormErrors = Partial<Record<keyof MeetFormData, string>>;

type CreateMeetResponse = {
  status?: string;
  success?: boolean;
  message?: string;
};

type IconBubbleProps = {
  Icon: LucideIcon;
  styles: ReturnType<typeof useStyles>;
};

const INITIAL_CRITERIA: MemberSearchCriteria = {
  search: '',
  company_name: '',
  brand_name: '',
  nature_of_business: '',
};

const INITIAL_FORM: MeetFormData = {
  metAt: null,
  mode: 'In-person',
  location: '',
  topicsDiscussed: '',
};

const MEMBER_TABS: Array<{ key: MembersTabKey; label: string }> = [
  { key: 'chapterRoster', label: 'Chapter Member' },
  { key: 'otherMember', label: 'Global Search' },
];

const MEETING_MODE_OPTIONS: DropdownItem[] = [
  { label: 'In-person', value: 'In-person' },
  { label: 'Online', value: 'Online' },
];

const getMemberCompany = (member: MemberApiRecord) =>
  member.member_profile?.company_name ||
  member.member_profile?.brand_name ||
  'Company not available';

const getMemberSpecialty = (member: MemberApiRecord) =>
  member.sub_category?.name ||
  member.category?.name ||
  member.member_profile?.nature_of_business ||
  'Speciality not available';

const mapMember = (member: MemberApiRecord): MemberProfile => ({
  id: member.id,
  name: member.name || '-',
  email: member.email || undefined,
  phone: member.phone || undefined,
  status: member.status || undefined,
  company: getMemberCompany(member),
  specialty: getMemberSpecialty(member),
  avatar: member.member_profile?.avatar || null,
  chapterName: member.primary_chapter?.name,
  chapterCity: member.primary_chapter?.city || undefined,
});

const getNextPage = (hasNextPage?: string | null, currentPage = 1) =>
  hasNextPage ? currentPage + 1 : null;

const mergePageMembers = (
  current: MemberProfile[],
  nextItems: MemberProfile[],
  page: number,
  mode: ListRequestMode,
) => {
  if (page <= 1 || mode !== 'next') {
    return nextItems;
  }

  const existingIds = new Set(current.map(member => member.id));
  const uniqueItems = nextItems.filter(member => !existingIds.has(member.id));

  return [...current, ...uniqueItems];
};

const IconBubble = ({ Icon, styles }: IconBubbleProps) => (
  <View style={styles.meetFormIconBubble}>
    <Icon
      width={styles.meetFormFieldIcon.width}
      height={styles.meetFormFieldIcon.height}
      color={styles.meetFormFieldIcon.color}
    />
  </View>
);

const MeetSlipForm = ({
  styles,
  onBackPress,
  onCreated,
}: MeetSlipFormProps) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const submittedRef = useRef(false);
  const requestContextRef = useRef<MembersRequestContext>('chapter');
  const requestModeRef = useRef<ListRequestMode>('initial');
  const globalRequestModeRef = useRef<ListRequestMode>('initial');

  const [activeTab, setActiveTab] = useState<MembersTabKey>('chapterRoster');
  const [rosterQuery, setRosterQuery] = useState('');
  const [criteria, setCriteria] =
    useState<MemberSearchCriteria>(INITIAL_CRITERIA);
  const [chapterMembers, setChapterMembers] = useState<MemberProfile[]>([]);
  const [globalMembers, setGlobalMembers] = useState<MemberProfile[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [globalNextPage, setGlobalNextPage] = useState<number | null>(null);
  const [requestMode, setRequestMode] = useState<ListRequestMode>('initial');
  const [globalRequestMode, setGlobalRequestMode] =
    useState<ListRequestMode>('initial');
  const [requestContext, setRequestContext] =
    useState<MembersRequestContext>('chapter');
  const [isGlobalResultView, setIsGlobalResultView] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(
    null,
  );
  const [form, setForm] = useState<MeetFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<MeetFormErrors>({});

  const searchResponse = useSelector(
    state => state.eliteMembers?.search?.data,
  ) as MembersSearchResponse | undefined;
  const searchLoading = useSelector(state =>
    Boolean(state.eliteMembers?.search?.loading),
  );
  const createResponse = useSelector(
    state => state.eliteMeets?.create?.data,
  ) as CreateMeetResponse | undefined;
  const createError = useSelector(state => state.eliteMeets?.create?.error);
  const createLoading = useSelector(state =>
    Boolean(state.eliteMeets?.create?.loading),
  );

  const fetchChapterMembers = useCallback(
    (page = 1, mode: ListRequestMode = 'refresh') => {
      requestContextRef.current = 'chapter';
      requestModeRef.current = mode;
      setRequestContext('chapter');
      setRequestMode(mode);
      dispatch(searchEliteMembers({ tab: 'chapter', page }));
    },
    [dispatch],
  );

  const getGlobalSearchParams = useCallback(
    (page = 1) => {
      const normalizeValue = (value: string) => value.trim();

      return {
        tab: 'global',
        page,
        search: normalizeValue(criteria.search),
        company_name: normalizeValue(criteria.company_name),
        brand_name: normalizeValue(criteria.brand_name),
        nature_of_business: normalizeValue(criteria.nature_of_business),
      };
    },
    [criteria],
  );

  const fetchGlobalMembers = useCallback(
    (page = 1, mode: ListRequestMode = 'refresh') => {
      requestContextRef.current = 'global';
      globalRequestModeRef.current = mode;
      setRequestContext('global');
      setGlobalRequestMode(mode);
      dispatch(searchEliteMembers(getGlobalSearchParams(page)));
    },
    [dispatch, getGlobalSearchParams],
  );

  const refreshChapterMembers = useCallback(() => {
    fetchChapterMembers(1, 'refresh');
  }, [fetchChapterMembers]);

  const refreshGlobalMembers = useCallback(() => {
    fetchGlobalMembers(1, 'refresh');
  }, [fetchGlobalMembers]);

  const fetchNextChapterMembers = useCallback(() => {
    if (searchLoading || !nextPage) return;
    fetchChapterMembers(nextPage, 'next');
  }, [fetchChapterMembers, nextPage, searchLoading]);

  const fetchNextGlobalMembers = useCallback(() => {
    if (searchLoading || !globalNextPage) return;
    fetchGlobalMembers(globalNextPage, 'next');
  }, [fetchGlobalMembers, globalNextPage, searchLoading]);

  useEffect(() => {
    dispatch(resetEliteMemberSearch());
    dispatch(resetEliteMeetCreate());
    fetchChapterMembers(1, 'initial');

    return () => {
      dispatch(resetEliteMemberSearch());
      dispatch(resetEliteMeetCreate());
    };
  }, [dispatch, fetchChapterMembers]);

  useEffect(() => {
    const pagination = searchResponse?.data;
    if (!pagination) return;

    const page = pagination.current_page ?? 1;
    const pageItems = (pagination.data ?? []).map(mapMember);
    const nextPageValue = getNextPage(pagination.next_page_url, page);

    if (requestContextRef.current === 'global') {
      setGlobalNextPage(nextPageValue);
      setGlobalMembers(current =>
        mergePageMembers(
          current,
          pageItems,
          page,
          globalRequestModeRef.current,
        ),
      );
      return;
    }

    setNextPage(nextPageValue);
    setChapterMembers(current =>
      mergePageMembers(current, pageItems, page, requestModeRef.current),
    );
  }, [searchResponse]);

  useEffect(() => {
    if (!submittedRef.current || !createResponse) return;

    submittedRef.current = false;

    const isSuccess =
      createResponse.status === 'success' || createResponse.success === true;

    if (isSuccess) {
      show.success(createResponse.message || 'Meet scheduled successfully.');
      setForm(INITIAL_FORM);
      setErrors({});
      dispatch(resetEliteMeetCreate());
      onCreated?.();
      return;
    }

    show.error(createResponse.message || 'Unable to schedule meet.');
  }, [createResponse, dispatch, onCreated]);

  useEffect(() => {
    if (!submittedRef.current || !createError) return;
    submittedRef.current = false;
  }, [createError]);

  const filteredMembers = useMemo(() => {
    const query = rosterQuery.trim().toLowerCase();

    if (!query) {
      return chapterMembers;
    }

    return chapterMembers.filter(member =>
      [
        member.name,
        member.company,
        member.specialty,
        member.email,
        member.phone,
        member.chapterName,
      ].some(value => value?.toLowerCase().includes(query)),
    );
  }, [chapterMembers, rosterQuery]);

  const canSearch = useMemo(
    () => Object.values(criteria).some(value => value.trim().length >= 2),
    [criteria],
  );

  const canClear = useMemo(
    () => Object.values(criteria).some(value => value.length > 0),
    [criteria],
  );

  const isChapterRequest = requestContext === 'chapter';
  const isGlobalRequest = requestContext === 'global';

  const selectedMode = useMemo(
    () =>
      MEETING_MODE_OPTIONS.find(option => option.value === form.mode) ?? null,
    [form.mode],
  );

  const canSubmit = useMemo(
    () =>
      Boolean(
        selectedMember &&
          form.metAt &&
          form.mode &&
          form.location.trim() &&
          !createLoading,
      ),
    [createLoading, form.location, form.metAt, form.mode, selectedMember],
  );

  const setCriteriaValue = useCallback(
    (key: keyof MemberSearchCriteria, value: string) => {
      setCriteria(current => ({
        ...current,
        [key]: value,
      }));
    },
    [],
  );

  const resetCriteria = useCallback(() => {
    setCriteria({ ...INITIAL_CRITERIA });
  }, []);

  const setActiveMemberTab = useCallback((tab: MembersTabKey) => {
    setActiveTab(tab);
    setIsGlobalResultView(false);
  }, []);

  const onSearchPress = useCallback(() => {
    if (!canSearch) {
      return;
    }

    setGlobalMembers([]);
    setGlobalNextPage(null);
    setIsGlobalResultView(true);
    fetchGlobalMembers(1, 'initial');
  }, [canSearch, fetchGlobalMembers]);

  const onBackToMemberList = useCallback(() => {
    setIsGlobalResultView(false);
  }, []);

  const onMemberPress = useCallback(
    (memberId: number) => {
      const sourceMembers =
        activeTab === 'otherMember' && isGlobalResultView
          ? globalMembers
          : filteredMembers;
      const member = sourceMembers.find(item => item.id === memberId);

      if (member) {
        setSelectedMember(member);
        setForm(INITIAL_FORM);
        setErrors({});
      }
    },
    [activeTab, filteredMembers, globalMembers, isGlobalResultView],
  );

  const setFieldError = useCallback(
    (key: keyof MeetFormData, value: SetStateAction<string>) => {
      setErrors(current => {
        const nextValue =
          typeof value === 'function' ? value(current[key] ?? '') : value;

        return {
          ...current,
          [key]: nextValue,
        };
      });
    },
    [],
  );

  const setFormValue = useCallback(
    (key: keyof MeetFormData, value: string | Date | null) => {
      setForm(current => ({
        ...current,
        [key]: value,
      }));
      setFieldError(key, '');
    },
    [setFieldError],
  );

  const setMode = useCallback(
    (item: DropdownItem | null) => {
      setFormValue('mode', item?.value ?? '');
    },
    [setFormValue],
  );

  const clearMetAt = useCallback(() => {
    setFormValue('metAt', null);
  }, [setFormValue]);

  const validateForm = useCallback(() => {
    const nextErrors: MeetFormErrors = {};

    if (!form.metAt) {
      nextErrors.metAt = 'Meeting date and time is required';
    } else if (form.metAt.getTime() > Date.now()) {
      nextErrors.metAt = 'Future date and time is not allowed';
    }

    if (!form.mode) {
      nextErrors.mode = 'Meeting mode is required';
    }

    if (!form.location.trim()) {
      nextErrors.location = 'Location / venue is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const onSubmit = useCallback(() => {
    if (!selectedMember || createLoading || !validateForm() || !form.metAt) {
      return;
    }

    submittedRef.current = true;
    dispatch(
      createEliteMeet({
        member_b: selectedMember.id,
        met_at: moment(form.metAt).format('YYYY-MM-DD hh:mm A'),
        location: form.location.trim(),
        mode: form.mode,
        topics_discussed: form.topicsDiscussed.trim(),
        status: 'Scheduled',
      }),
    );
  }, [createLoading, dispatch, form, selectedMember, validateForm]);

  const renderDropdownIcon = () => (
    <ChevronDown
      width={styles.meetFormDropdownIcon.width}
      height={styles.meetFormDropdownIcon.height}
      color={styles.meetFormDropdownIcon.color}
    />
  );

  const renderTabs = () => (
    <View style={styles.meetMemberTabs}>
      {MEMBER_TABS.map(tab => {
        const isActive = activeTab === tab.key;
        const showClearIcon = tab.key === 'otherMember' && isGlobalResultView;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => setActiveMemberTab(tab.key)}
            style={[
              styles.meetMemberTab,
              isActive && styles.meetMemberActiveTab,
            ]}
          >
            <AppText
              semibold={isActive}
              centered
              numberOfLines={1}
              label={tab.label}
              style={[
                styles.meetMemberTabText,
                showClearIcon && styles.meetMemberTabTextWithClear,
                isActive && styles.meetMemberActiveTabText,
              ]}
            />
            {showClearIcon ? (
              <Pressable
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Clear global search"
                onPress={event => {
                  event.stopPropagation();
                  onBackToMemberList();
                }}
                style={styles.meetMemberTabClearButton}
              >
                <X
                  width={styles.meetMemberTabClearIcon.width}
                  height={styles.meetMemberTabClearIcon.height}
                  color={styles.meetMemberTabClearIcon.color}
                />
              </Pressable>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );

  const renderMemberPicker = () => (
    <View style={styles.meetMemberPicker}>
      {renderTabs()}

      {activeTab === 'chapterRoster' ? (
        <MemberListContent
          title="Chapter Member"
          hasNextPage={Boolean(nextPage)}
          members={filteredMembers}
          searchValue={rosterQuery}
          isRefreshing={
            isChapterRequest && searchLoading && requestMode === 'refresh'
          }
          count={filteredMembers.length}
          onMemberPress={onMemberPress}
          onSearchChange={setRosterQuery}
          isInitialLoading={
            isChapterRequest &&
            searchLoading &&
            requestMode === 'initial' &&
            !chapterMembers.length
          }
          onRefresh={refreshChapterMembers}
          isFetchingNextPage={
            isChapterRequest && searchLoading && requestMode === 'next'
          }
          onFetchNext={fetchNextChapterMembers}
          searchPlaceholder="Search by name, speciality..."
          emptyDescription="Try another name, company, or speciality."
        />
      ) : isGlobalResultView ? (
        <MemberListContent
          title="Global Search Results"
          members={globalMembers}
          count={globalMembers.length}
          hasNextPage={Boolean(globalNextPage)}
          onMemberPress={onMemberPress}
          isRefreshing={
            isGlobalRequest && searchLoading && globalRequestMode === 'refresh'
          }
          onRefresh={refreshGlobalMembers}
          onFetchNext={fetchNextGlobalMembers}
          isInitialLoading={
            isGlobalRequest &&
            searchLoading &&
            globalRequestMode === 'initial' &&
            !globalMembers.length
          }
          isFetchingNextPage={
            isGlobalRequest && searchLoading && globalRequestMode === 'next'
          }
          emptyDescription="Try updating your global search criteria."
        />
      ) : (
        <GlobalSearchForm
          canClear={canClear}
          criteria={criteria}
          canSearch={canSearch}
          onClear={resetCriteria}
          onSearch={onSearchPress}
          onChange={setCriteriaValue}
        />
      )}
    </View>
  );

  const renderSelectedMember = () =>
    selectedMember ? (
      <View style={styles.meetSelectedMemberCard}>
        <View style={styles.meetSelectedMemberIcon}>
          <UserRound
            width={styles.meetSelectedMemberGlyph.width}
            height={styles.meetSelectedMemberGlyph.height}
            color={styles.meetSelectedMemberGlyph.color}
          />
        </View>
        <View style={styles.meetSelectedMemberBody}>
          <AppText
            semibold
            numberOfLines={1}
            label={selectedMember.name}
            style={styles.meetSelectedMemberName}
          />
          <View style={styles.meetSelectedMemberMetaRow}>
            <BriefcaseBusiness
              width={styles.meetSelectedMemberMetaIcon.width}
              height={styles.meetSelectedMemberMetaIcon.height}
              color={styles.meetSelectedMemberMetaIcon.color}
            />
            <AppText
              numberOfLines={1}
              label={selectedMember.company}
              style={styles.meetSelectedMemberMeta}
            />
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setSelectedMember(null)}
          style={({ pressed }) => [
            styles.meetChangeMemberButton,
            pressed && styles.meetFormControlPressed,
          ]}
        >
          <Search
            width={styles.meetChangeMemberIcon.width}
            height={styles.meetChangeMemberIcon.height}
            color={styles.meetChangeMemberIcon.color}
          />
        </Pressable>
      </View>
    ) : null;

  const renderMeetForm = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.meetFormContent}
    >
      {renderSelectedMember()}

      <View style={styles.meetFormSectionCard}>
        <View style={styles.meetFormSectionHeader}>
          <AppText
            semibold
            label="Meeting Details"
            style={styles.meetFormSectionTitle}
          />
          <AppText label="Required *" style={styles.meetFormSectionMeta} />
        </View>

        <AppDatePicker
          value={form.metAt ?? undefined}
          error={errors.metAt}
          mode="datetime"
          placeholder="Meeting Date & Time *"
          maximumDate={new Date()}
          wrapperStyle={styles.meetFormDropdownWrapper}
          style={styles.meetFormInputWrapper}
          displayStyle={styles.meetFormSelectText}
          leftIcon={<IconBubble Icon={CalendarDays} styles={styles} />}
          setError={value => setFieldError('metAt', value)}
          onChangeDate={date => setFormValue('metAt', date)}
          handleClearInput={clearMetAt}
        />

        <AppDropdown
          itemList={MEETING_MODE_OPTIONS}
          selectedValue={selectedMode}
          error={errors.mode}
          placeholder="Meeting Mode *"
          wrapperStyle={styles.meetFormDropdownWrapper}
          style={styles.meetFormInputWrapper}
          labelStyle={styles.meetFormSelectText}
          placeholderStyle={styles.meetFormSelectText}
          leftIcon={<IconBubble Icon={UsersRound} styles={styles} />}
          rightElement={renderDropdownIcon()}
          onSelectItem={setMode}
        />

        <AppInput
          value={form.location}
          error={errors.location}
          placeholder="Location / Venue *"
          autoCapitalize="sentences"
          placeholderTextColor={String(colors.gray)}
          style={styles.meetFormInputWrapper}
          inputStyle={styles.meetFormInputText}
          leftIcon={<IconBubble Icon={MapPin} styles={styles} />}
          setError={value => setFieldError('location', value)}
          onChangeText={value => setFormValue('location', value)}
        />

        <View style={styles.meetFormTextAreaWrapper}>
          <IconBubble Icon={ReceiptText} styles={styles} />
          <TextInput
            multiline
            value={form.topicsDiscussed}
            textAlignVertical="top"
            placeholder="Topics Discussed / Business Synergy Notes"
            autoCapitalize="sentences"
            cursorColor={colors.text}
            selectionColor={colors.primary}
            onChangeText={value => setFormValue('topicsDiscussed', value)}
            placeholderTextColor={String(colors.gray)}
            style={styles.meetFormTextArea}
          />
        </View>
      </View>

      <View style={styles.meetFormActionRow}>
        <Pressable
          accessibilityRole="button"
          onPress={onBackPress}
          style={({ pressed }) => [
            styles.meetFormCancelButton,
            pressed && styles.meetFormControlPressed,
          ]}
        >
          <X
            width={styles.meetFormActionIcon.width}
            height={styles.meetFormActionIcon.height}
            color={styles.meetFormCancelText.color}
          />
          <AppText semibold label="Cancel" style={styles.meetFormCancelText} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          disabled={!canSubmit || createLoading}
          onPress={onSubmit}
          style={({ pressed }) => [
            styles.meetFormSubmitButton,
            (!canSubmit || createLoading) && styles.meetFormDisabledButton,
            pressed && styles.meetFormControlPressed,
          ]}
        >
          {createLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <>
              <Check
                width={styles.meetFormActionIcon.width}
                height={styles.meetFormActionIcon.height}
                color={styles.meetFormSubmitText.color}
              />
              <AppText
                semibold
                label="Schedule Meet"
                style={styles.meetFormSubmitText}
              />
            </>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );

  return selectedMember ? renderMeetForm() : renderMemberPicker();
};

export default MeetSlipForm;
