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
  BadgeIndianRupee,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Search,
  UserRound,
  X,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import { AppDatePicker, AppDropdown, AppText } from '@components';
import type { DropdownItem } from '@components/form/appDropdown/types';
import { useDispatch, useSelector } from '@hooks';
import { show } from '@utils/helpers';
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
  createEliteCloseBusiness,
  resetEliteCloseBusinessCreate,
} from '@store/slices/app/eliteCloseBusiness/eliteCloseBusiness';
import type useStyles from '../styles';

type EliteSlipFormProps = {
  styles: ReturnType<typeof useStyles>;
  onBackPress: () => void;
  onCreated?: () => void;
};

type ListRequestMode = 'initial' | 'refresh' | 'next';
type MembersRequestContext = 'chapter' | 'global';
type BusinessType = 'New' | 'Recurring';

type CloseBusinessFormData = {
  businessType: BusinessType;
  amount: string;
  paidDate: Date | null;
};

type CloseBusinessFormErrors = Partial<
  Record<keyof CloseBusinessFormData, string>
>;

type CreateCloseBusinessResponse = {
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

const INITIAL_FORM: CloseBusinessFormData = {
  businessType: 'New',
  amount: '',
  paidDate: null,
};

const MEMBER_TABS: Array<{ key: MembersTabKey; label: string }> = [
  { key: 'chapterRoster', label: 'Chapter Member' },
  { key: 'otherMember', label: 'Global Search' },
];

const BUSINESS_TYPE_OPTIONS: DropdownItem[] = [
  { label: 'New Business', value: 'New' },
  { label: 'Recurring Business', value: 'Recurring' },
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

const normalizeAmount = (value: string) => value.replace(/[^\d.]/g, '');

const EliteSlipForm = ({
  styles,
  onBackPress,
  onCreated,
}: EliteSlipFormProps) => {
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
  const [form, setForm] = useState<CloseBusinessFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<CloseBusinessFormErrors>({});

  const searchResponse = useSelector(
    state => state.eliteMembers?.search?.data,
  ) as MembersSearchResponse | undefined;
  const searchLoading = useSelector(state =>
    Boolean(state.eliteMembers?.search?.loading),
  );
  const createResponse = useSelector(
    state => state.eliteCloseBusiness?.create?.data,
  ) as CreateCloseBusinessResponse | undefined;
  const createError = useSelector(
    state => state.eliteCloseBusiness?.create?.error,
  );
  const createLoading = useSelector(state =>
    Boolean(state.eliteCloseBusiness?.create?.loading),
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
    dispatch(resetEliteCloseBusinessCreate());
    fetchChapterMembers(1, 'initial');

    return () => {
      dispatch(resetEliteMemberSearch());
      dispatch(resetEliteCloseBusinessCreate());
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
      show.success(
        createResponse.message || 'Elite Close Business successfully logged.',
      );
      setForm(INITIAL_FORM);
      setErrors({});
      dispatch(resetEliteCloseBusinessCreate());
      onCreated?.();
      return;
    }

    show.error(createResponse.message || 'Unable to log elite close business.');
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

  const selectedBusinessType = useMemo(
    () =>
      BUSINESS_TYPE_OPTIONS.find(
        option => option.value === form.businessType,
      ) ?? null,
    [form.businessType],
  );

  const isChapterRequest = requestContext === 'chapter';
  const isGlobalRequest = requestContext === 'global';

  const canSubmit = useMemo(
    () =>
      Boolean(
        selectedMember &&
          form.businessType &&
          Number(form.amount) > 0 &&
          form.paidDate &&
          !createLoading,
      ),
    [
      createLoading,
      form.amount,
      form.businessType,
      form.paidDate,
      selectedMember,
    ],
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
    (key: keyof CloseBusinessFormData, value: SetStateAction<string>) => {
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
    (key: keyof CloseBusinessFormData, value: string | Date | null) => {
      setForm(current => ({
        ...current,
        [key]: value,
      }));
      setFieldError(key, '');
    },
    [setFieldError],
  );

  const setBusinessType = useCallback(
    (item: DropdownItem | null) => {
      setFormValue(
        'businessType',
        ((item?.value as BusinessType | undefined) ?? 'New') as BusinessType,
      );
    },
    [setFormValue],
  );

  const setAmount = useCallback(
    (value: string) => {
      setFormValue('amount', normalizeAmount(value));
    },
    [setFormValue],
  );

  const clearPaidDate = useCallback(() => {
    setFormValue('paidDate', null);
  }, [setFormValue]);

  const validateForm = useCallback(() => {
    const nextErrors: CloseBusinessFormErrors = {};

    if (!form.businessType) {
      nextErrors.businessType = 'Business type is required';
    }

    if (!form.amount.trim() || Number(form.amount) <= 0) {
      nextErrors.amount = 'Actual close business value is required';
    }

    if (!form.paidDate) {
      nextErrors.paidDate = 'Payment / closed date is required';
    } else if (form.paidDate.getTime() > Date.now()) {
      nextErrors.paidDate = 'Future date is not allowed';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const onSubmit = useCallback(() => {
    if (!selectedMember || createLoading || !validateForm() || !form.paidDate) {
      return;
    }

    submittedRef.current = true;
    dispatch(
      createEliteCloseBusiness({
        given_by: selectedMember.id,
        type: form.businessType,
        amount: Number(form.amount),
        paid_date: moment(form.paidDate).format('YYYY-MM-DD'),
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

  const renderCloseBusinessForm = () => (
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
            label="Close Business Details"
            style={styles.meetFormSectionTitle}
          />
          <AppText label="Required *" style={styles.meetFormSectionMeta} />
        </View>

        <AppDropdown
          itemList={BUSINESS_TYPE_OPTIONS}
          selectedValue={selectedBusinessType}
          error={errors.businessType}
          placeholder="Business Type *"
          wrapperStyle={styles.meetFormDropdownWrapper}
          style={styles.meetFormInputWrapper}
          labelStyle={styles.meetFormSelectText}
          placeholderStyle={styles.meetFormSelectText}
          leftIcon={<IconBubble Icon={BriefcaseBusiness} styles={styles} />}
          rightElement={renderDropdownIcon()}
          onSelectItem={setBusinessType}
        />

        <View style={styles.referralPhoneWrapper}>
          <IconBubble Icon={BadgeIndianRupee} styles={styles} />
          <TextInput
            value={form.amount}
            keyboardType="numeric"
            placeholder="Actual Elite Close Business Value (₹) *"
            cursorColor={colors.text}
            selectionColor={colors.primary}
            onChangeText={setAmount}
            placeholderTextColor={String(colors.gray)}
            style={styles.closeBusinessAmountInput}
          />
        </View>
        {errors.amount ? (
          <AppText label={errors.amount} style={styles.referralErrorText} />
        ) : null}

        <AppDatePicker
          value={form.paidDate ?? undefined}
          error={errors.paidDate}
          mode="date"
          placeholder="Payment / Closed Date *"
          maximumDate={new Date()}
          wrapperStyle={styles.meetFormDropdownWrapper}
          style={styles.meetFormInputWrapper}
          displayStyle={styles.meetFormSelectText}
          leftIcon={<IconBubble Icon={CalendarDays} styles={styles} />}
          setError={value => setFieldError('paidDate', value)}
          onChangeDate={date => setFormValue('paidDate', date)}
          handleClearInput={clearPaidDate}
        />
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
                label="Log Elite Close Business"
                style={styles.meetFormSubmitText}
              />
            </>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );

  return selectedMember ? renderCloseBusinessForm() : renderMemberPicker();
};

export default EliteSlipForm;
