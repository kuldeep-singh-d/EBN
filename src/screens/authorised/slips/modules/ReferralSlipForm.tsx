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
  Check,
  ChevronDown,
  Flame,
  Mail,
  Phone,
  ReceiptText,
  Search,
  Star,
  UserRound,
  X,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import { AppDropdown, AppInput, AppText } from '@components';
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
  createReferral,
  resetReferralCreate,
} from '@store/slices/app/eliteReferrals/eliteReferrals';
import { getMyProfile } from '@store/slices/app/profile/profile';
import type useStyles from '../styles';

type ReferralSlipFormProps = {
  styles: ReturnType<typeof useStyles>;
  onBackPress: () => void;
  onCreated?: () => void;
};

type ListRequestMode = 'initial' | 'refresh' | 'next';
type MembersRequestContext = 'chapter' | 'global';
type ReferralType = 'internal' | 'external';

type ReferralFormData = {
  referralType: ReferralType;
  referralTypeLabel: string;
  prospectName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  temperature: number;
  requirement: string;
};

type ReferralFormErrors = Partial<Record<keyof ReferralFormData, string>>;

type CreateReferralResponse = {
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

const MEMBER_TABS: Array<{ key: MembersTabKey; label: string }> = [
  { key: 'chapterRoster', label: 'Chapter Member' },
  { key: 'otherMember', label: 'Global Search' },
];

const REFERRAL_TYPE_OPTIONS: DropdownItem[] = [
  { label: 'Internal (Inside Elite Business...)', value: 'internal' },
  { label: 'External (Outside Elite Business...)', value: 'external' },
];

const TEMPERATURE_LEVELS = [
  {
    value: 1,
    label: 'Cold Lead',
    hint: 'Early conversation',
  },
  {
    value: 2,
    label: 'Warm Lead',
    hint: 'Interest visible',
  },
  {
    value: 3,
    label: 'Hot Lead',
    hint: 'Strong requirement',
  },
  {
    value: 4,
    label: 'Priority Lead',
    hint: 'Decision soon',
  },
  {
    value: 5,
    label: 'Ready Referral',
    hint: 'High intent',
  },
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

const getProfileData = (value: unknown): Record<string, any> => {
  if (!value || typeof value !== 'object') {
    return {};
  }

  const response = value as Record<string, any>;
  const data = response.data;

  if (data && typeof data === 'object' && 'data' in data) {
    return (data as Record<string, any>).data ?? {};
  }

  return data && typeof data === 'object'
    ? (data as Record<string, any>)
    : response;
};

const normalizePhone = (value: string) => value.replace(/\D/g, '');

const getReferralApiType = (type: ReferralType) =>
  type === 'internal' ? 'Internal' : 'External';

const ReferralSlipForm = ({
  styles,
  onBackPress,
  onCreated,
}: ReferralSlipFormProps) => {
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
  const [form, setForm] = useState<ReferralFormData>({
    referralType: 'internal',
    referralTypeLabel: REFERRAL_TYPE_OPTIONS[0].label,
    prospectName: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    temperature: 0,
    requirement: '',
  });
  const [errors, setErrors] = useState<ReferralFormErrors>({});

  const searchResponse = useSelector(
    state => state.eliteMembers?.search?.data,
  ) as MembersSearchResponse | undefined;
  const searchLoading = useSelector(state =>
    Boolean(state.eliteMembers?.search?.loading),
  );
  const loginUser = useSelector(state => {
    const loginData = state.login?.data as any;

    return loginData?.data?.user ?? loginData?.user;
  }) as
    | {
        name?: string;
        email?: string;
        phone?: string;
      }
    | undefined;
  const profileResponse = useSelector(state => state.profile?.me?.data);
  const createResponse = useSelector(
    state => state.eliteReferrals?.create?.data,
  ) as CreateReferralResponse | undefined;
  const createError = useSelector(state => state.eliteReferrals?.create?.error);
  const createLoading = useSelector(state =>
    Boolean(state.eliteReferrals?.create?.loading),
  );

  const currentUserDefaults = useMemo(() => {
    const profile = getProfileData(profileResponse);
    const profileDetails = profile.member_profile ?? profile.profile ?? {};

    return {
      prospectName: profile.name ?? loginUser?.name ?? '',
      companyName:
        profileDetails.company_name ??
        profileDetails.brand_name ??
        profile.company_name ??
        profile.brand_name ??
        '',
      phoneNumber: profile.phone ?? loginUser?.phone ?? '',
      email: profile.email ?? loginUser?.email ?? '',
    };
  }, [loginUser, profileResponse]);

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
    dispatch(resetReferralCreate());
    dispatch(getMyProfile());
    fetchChapterMembers(1, 'initial');

    return () => {
      dispatch(resetEliteMemberSearch());
      dispatch(resetReferralCreate());
    };
  }, [dispatch, fetchChapterMembers]);

  useEffect(() => {
    if (!submittedRef.current || !createResponse) return;

    submittedRef.current = false;

    const isSuccess =
      createResponse.status === 'success' || createResponse.success === true;

    if (isSuccess) {
      show.success(
        createResponse.message || 'Elite Referral successfully logged.',
      );
      dispatch(resetReferralCreate());
      onCreated?.();
      return;
    }

    show.error(createResponse.message || 'Unable to submit elite referral.');
  }, [createResponse, dispatch, onCreated]);

  useEffect(() => {
    if (!submittedRef.current || !createError) return;
    submittedRef.current = false;
  }, [createError]);

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
    if (form.referralType !== 'internal') {
      return;
    }

    setForm(current => ({
      ...current,
      ...currentUserDefaults,
    }));
  }, [currentUserDefaults, form.referralType]);

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
  const selectedReferralType = useMemo(
    () =>
      REFERRAL_TYPE_OPTIONS.find(
        option => option.value === form.referralType,
      ) ?? null,
    [form.referralType],
  );
  const selectedTemperature = useMemo(
    () => TEMPERATURE_LEVELS.find(item => item.value === form.temperature),
    [form.temperature],
  );

  const canSubmit = useMemo(
    () =>
      Boolean(
        selectedMember &&
          form.referralType &&
          form.prospectName.trim() &&
          form.phoneNumber.trim() &&
          form.requirement.trim() &&
          !createLoading,
      ),
    [
      createLoading,
      form.phoneNumber,
      form.prospectName,
      form.referralType,
      form.requirement,
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
        setErrors({});
      }
    },
    [activeTab, filteredMembers, globalMembers, isGlobalResultView],
  );

  const setFieldError = useCallback(
    (key: keyof ReferralFormData, value: SetStateAction<string>) => {
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
    (key: keyof ReferralFormData, value: string | number) => {
      setForm(current => ({
        ...current,
        [key]: value,
      }));
      setFieldError(key, '');
    },
    [setFieldError],
  );

  const setReferralType = useCallback(
    (item: DropdownItem | null) => {
      const referralType =
        (item?.value as ReferralType | undefined) ?? 'external';

      setForm(current => ({
        ...current,
        referralType,
        referralTypeLabel: item?.label ?? '',
        prospectName:
          referralType === 'internal' ? currentUserDefaults.prospectName : '',
        companyName:
          referralType === 'internal' ? currentUserDefaults.companyName : '',
        phoneNumber:
          referralType === 'internal' ? currentUserDefaults.phoneNumber : '',
        email: referralType === 'internal' ? currentUserDefaults.email : '',
      }));
      setErrors(current => ({
        ...current,
        referralType: '',
        prospectName: '',
        phoneNumber: '',
      }));
    },
    [currentUserDefaults],
  );

  const validateForm = useCallback(() => {
    const nextErrors: ReferralFormErrors = {};

    if (!form.referralType) {
      nextErrors.referralType = 'Referral type is required';
    }

    if (!form.prospectName.trim()) {
      nextErrors.prospectName = 'Prospect name is required';
    }

    if (!normalizePhone(form.phoneNumber)) {
      nextErrors.phoneNumber = 'Phone number is required';
    }

    if (!form.requirement.trim()) {
      nextErrors.requirement = 'Requirement / description is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const onSubmit = useCallback(() => {
    if (!selectedMember || createLoading || !validateForm()) {
      return;
    }

    submittedRef.current = true;
    dispatch(
      createReferral({
        referred_to: selectedMember.id,
        type: getReferralApiType(form.referralType),
        date_submitted: moment().format('YYYY-MM-DD'),
        prospect_name: form.prospectName.trim(),
        company_name: form.companyName.trim(),
        phone: normalizePhone(form.phoneNumber),
        email: form.email.trim(),
        requirement: form.requirement.trim(),
        rating: form.temperature || undefined,
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

  const renderTemperature = () => (
    <View style={styles.referralTemperatureCard}>
      <View style={styles.referralTemperatureHeader}>
        <View>
          <AppText
            semibold
            label="Referral Temperature"
            style={styles.referralTemperatureTitle}
          />
          <AppText
            label="Tap/Swipe stars to rate referral readiness"
            style={styles.referralTemperatureSubtitle}
          />
        </View>
        <View style={styles.referralTemperatureIcon}>
          <Flame
            width={styles.referralTemperatureGlyph.width}
            height={styles.referralTemperatureGlyph.height}
            color={styles.referralTemperatureGlyph.color}
          />
        </View>
      </View>

      <View style={styles.referralStarRow}>
        {TEMPERATURE_LEVELS.map(level => {
          const isSelected = form.temperature >= level.value;

          return (
            <Pressable
              key={level.value}
              accessibilityRole="button"
              onPress={() => setFormValue('temperature', level.value)}
              style={({ pressed }) => [
                styles.referralStarButton,
                isSelected && styles.referralStarButtonActive,
                pressed && styles.meetFormControlPressed,
              ]}
            >
              <Star
                width={styles.referralStarIcon.width}
                height={styles.referralStarIcon.height}
                color={
                  isSelected
                    ? styles.referralStarIconActive.color
                    : styles.referralStarIcon.color
                }
                fill={
                  isSelected
                    ? String(styles.referralStarIconActive.color)
                    : 'transparent'
                }
              />
            </Pressable>
          );
        })}
      </View>

      {selectedTemperature ? (
        <View style={styles.referralTemperatureResult}>
          <AppText
            semibold
            label={selectedTemperature.label}
            style={styles.referralTemperatureResultTitle}
          />
          <AppText
            label={selectedTemperature.hint}
            style={styles.referralTemperatureResultText}
          />
        </View>
      ) : null}
    </View>
  );

  const renderReferralForm = () => {
    const isInternal = form.referralType === 'internal';

    return (
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
              label="Referral Details"
              style={styles.meetFormSectionTitle}
            />
            <AppText label="Required *" style={styles.meetFormSectionMeta} />
          </View>

          <AppDropdown
            itemList={REFERRAL_TYPE_OPTIONS}
            selectedValue={selectedReferralType}
            error={errors.referralType}
            placeholder="Elite Referral Type *"
            wrapperStyle={styles.meetFormDropdownWrapper}
            style={styles.meetFormInputWrapper}
            labelStyle={styles.meetFormSelectText}
            placeholderStyle={styles.meetFormSelectText}
            leftIcon={<IconBubble Icon={ReceiptText} styles={styles} />}
            rightElement={renderDropdownIcon()}
            onSelectItem={setReferralType}
          />

          <AppInput
            value={form.prospectName}
            editable={!isInternal}
            error={errors.prospectName}
            placeholder="Prospect Name *"
            autoCapitalize="words"
            placeholderTextColor={String(colors.gray)}
            style={styles.meetFormInputWrapper}
            inputStyle={styles.meetFormInputText}
            leftIcon={<IconBubble Icon={UserRound} styles={styles} />}
            setError={value => setFieldError('prospectName', value)}
            onChangeText={value => setFormValue('prospectName', value)}
          />

          <AppInput
            value={form.companyName}
            editable={!isInternal}
            placeholder="Company Name"
            autoCapitalize="words"
            placeholderTextColor={String(colors.gray)}
            style={styles.meetFormInputWrapper}
            inputStyle={styles.meetFormInputText}
            leftIcon={<IconBubble Icon={BriefcaseBusiness} styles={styles} />}
            onChangeText={value => setFormValue('companyName', value)}
          />

          <View style={styles.referralPhoneWrapper}>
            <IconBubble Icon={Phone} styles={styles} />
            <View style={styles.referralPhonePrefixInline}>
              <AppText
                semibold
                label="+91"
                style={styles.referralPhonePrefixInlineText}
              />
            </View>
            <TextInput
              value={form.phoneNumber}
              editable={!isInternal}
              keyboardType="phone-pad"
              placeholder="Phone Number *"
              cursorColor={colors.text}
              selectionColor={colors.primary}
              onChangeText={value => setFormValue('phoneNumber', value)}
              placeholderTextColor={String(colors.gray)}
              style={styles.referralPhoneInput}
            />
          </View>
          {errors.phoneNumber ? (
            <AppText
              label={errors.phoneNumber}
              style={styles.referralErrorText}
            />
          ) : null}

          <AppInput
            value={form.email}
            editable={!isInternal}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={String(colors.gray)}
            style={styles.meetFormInputWrapper}
            inputStyle={styles.meetFormInputText}
            leftIcon={<IconBubble Icon={Mail} styles={styles} />}
            onChangeText={value => setFormValue('email', value)}
          />

          {renderTemperature()}

          <View style={styles.meetFormTextAreaWrapper}>
            <IconBubble Icon={ReceiptText} styles={styles} />
            <TextInput
              multiline
              value={form.requirement}
              textAlignVertical="top"
              placeholder="Requirements / Description *"
              autoCapitalize="sentences"
              cursorColor={colors.text}
              selectionColor={colors.primary}
              onChangeText={value => setFormValue('requirement', value)}
              placeholderTextColor={String(colors.gray)}
              style={styles.meetFormTextArea}
            />
          </View>
          {errors.requirement ? (
            <AppText
              label={errors.requirement}
              style={styles.referralErrorText}
            />
          ) : null}
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
            <AppText
              semibold
              label="Cancel"
              style={styles.meetFormCancelText}
            />
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
                  label="Submit Referral"
                  style={styles.meetFormSubmitText}
                />
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    );
  };

  return selectedMember ? renderReferralForm() : renderMemberPicker();
};

export default ReferralSlipForm;
