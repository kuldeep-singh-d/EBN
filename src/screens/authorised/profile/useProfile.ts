import moment from 'moment';
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTheme } from '@react-navigation/native';

import useStyles from './styles';
import { useDispatch, useSelector } from '@hooks';
import { show } from '@utils/helpers';
import {
  getMyProfile,
  resetProfileUpdate,
  updateMyProfile,
} from '@store/slices/app/profile/profile';
import type {
  ProfileApiData,
  ProfileFormData,
  ProfileFormErrors,
  ProfileResponse,
  ProfileSectionKey,
} from './types';

const SECTION_ORDER: ProfileSectionKey[] = ['basic', 'business', 'network'];

const SECTION_TABS: Array<{ key: ProfileSectionKey; label: string }> = [
  { key: 'basic', label: 'Basic' },
  { key: 'business', label: 'Business' },
  { key: 'network', label: 'Network' },
];

const TEXT_FIELDS: Array<keyof ProfileFormData> = [
  'name',
  'phone',
  'email',
  'whatsapp',
  'residential_address',
  'academic_qualification',
  'spouse_name',
  'spouse_profession',
  'kids_details',
  'brand_name',
  'company_name',
  'gst_number',
  'website',
  'years_in_business',
  'pincode',
  'city',
  'office_address',
  'office_ownership',
  'employees',
  'annual_turnover',
  'monthly_avg_business',
  'target_customers',
  'geographical_area',
  'top_5_ideal_clients',
  'nature_of_business',
  'referrals_looking_for',
  'categories_max_business',
  'sales_team_count',
  'referrals_monthly_capacity',
  'previous_network_name',
  'disputes_description',
];

const BOOLEAN_FIELDS: Array<keyof ProfileFormData> = [
  'has_sales_team',
  'has_client_database',
  'past_disputes',
];

const EMPTY_FORM: ProfileFormData = {
  name: '',
  phone: '',
  email: '',
  password: '',
  whatsapp: '',
  dob: null,
  residential_address: '',
  academic_qualification: '',
  anniversary_date: null,
  spouse_name: '',
  spouse_profession: '',
  kids_details: '',
  brand_name: '',
  company_name: '',
  gst_number: '',
  website: '',
  years_in_business: '',
  pincode: '',
  city: '',
  office_address: '',
  office_ownership: '',
  employees: '',
  annual_turnover: '',
  monthly_avg_business: '',
  target_customers: '',
  geographical_area: '',
  top_5_ideal_clients: '',
  nature_of_business: '',
  referrals_looking_for: '',
  categories_max_business: '',
  has_sales_team: false,
  sales_team_count: '',
  referrals_monthly_capacity: '',
  has_client_database: false,
  previous_network_name: '',
  past_disputes: false,
  disputes_description: '',
};

const toText = (value: unknown) =>
  value === null || value === undefined ? '' : String(value);

const toBoolean = (value: unknown) =>
  value === true || value === 1 || value === '1' || value === 'true';

const parseApiDate = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const parsed = moment(
    value,
    ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
    true,
  );

  return parsed.isValid() ? parsed.toDate() : null;
};

const formatPayloadDate = (value: Date | null) =>
  value ? moment(value).format('YYYY-MM-DD') : null;

const normalizeApiDate = (value?: string | null) => {
  const date = parseApiDate(value);

  return formatPayloadDate(date);
};

const getProfileData = (response?: ProfileResponse): ProfileApiData => {
  if (!response?.data || typeof response.data !== 'object') {
    return {};
  }

  return response.data;
};

const mapProfileToForm = (profile: ProfileApiData): ProfileFormData => ({
  name: toText(profile.name),
  phone: toText(profile.phone),
  email: toText(profile.email),
  password: '',
  whatsapp: toText(profile.whatsapp),
  dob: parseApiDate(profile.dob),
  residential_address: toText(profile.residential_address),
  academic_qualification: toText(profile.academic_qualification),
  anniversary_date: parseApiDate(profile.anniversary_date),
  spouse_name: toText(profile.spouse_name),
  spouse_profession: toText(profile.spouse_profession),
  kids_details: toText(profile.kids_details),
  brand_name: toText(profile.brand_name),
  company_name: toText(profile.company_name),
  gst_number: toText(profile.gst_number),
  website: toText(profile.website),
  years_in_business: toText(profile.years_in_business),
  pincode: toText(profile.pincode),
  city: toText(profile.city),
  office_address: toText(profile.office_address),
  office_ownership: toText(profile.office_ownership),
  employees: toText(profile.employees),
  annual_turnover: toText(profile.annual_turnover),
  monthly_avg_business: toText(profile.monthly_avg_business),
  target_customers: toText(profile.target_customers),
  geographical_area: toText(profile.geographical_area),
  top_5_ideal_clients: toText(profile.top_5_ideal_clients),
  nature_of_business: toText(profile.nature_of_business),
  referrals_looking_for: toText(profile.referrals_looking_for),
  categories_max_business: toText(profile.categories_max_business),
  has_sales_team: toBoolean(profile.has_sales_team),
  sales_team_count: toText(profile.sales_team_count),
  referrals_monthly_capacity: toText(profile.referrals_monthly_capacity),
  has_client_database: toBoolean(profile.has_client_database),
  previous_network_name: toText(profile.previous_network_name),
  past_disputes: toBoolean(profile.past_disputes),
  disputes_description: toText(profile.disputes_description),
});

const buildUpdatePayload = (form: ProfileFormData, profile: ProfileApiData) => {
  const payload: Record<string, unknown> = {};

  TEXT_FIELDS.forEach(key => {
    const nextValue = String(form[key] ?? '').trim();
    const previousValue = toText(profile[key as keyof ProfileApiData]).trim();

    if (nextValue !== previousValue) {
      payload[key] = nextValue;
    }
  });

  const nextDob = formatPayloadDate(form.dob);
  if (nextDob !== normalizeApiDate(profile.dob)) {
    payload.dob = nextDob;
  }

  const nextAnniversaryDate = formatPayloadDate(form.anniversary_date);
  if (nextAnniversaryDate !== normalizeApiDate(profile.anniversary_date)) {
    payload.anniversary_date = nextAnniversaryDate;
  }

  BOOLEAN_FIELDS.forEach(key => {
    const nextValue = Boolean(form[key]);
    const previousValue = toBoolean(profile[key as keyof ProfileApiData]);

    if (nextValue !== previousValue) {
      payload[key] = nextValue;
    }
  });

  if (form.password.trim()) {
    payload.password = form.password.trim();
  }

  return payload;
};

const useProfile = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const submittedRef = useRef(false);

  const [activeSection, setActiveSection] =
    useState<ProfileSectionKey>('basic');
  const [form, setForm] = useState<ProfileFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const profileResponse = useSelector(state => state.profile?.me?.data) as
    | ProfileResponse
    | undefined;
  const profileLoading = useSelector(state =>
    Boolean(state.profile?.me?.loading),
  );
  const updateResponse = useSelector(state => state.profile?.update?.data) as
    | ProfileResponse
    | undefined;
  const updateError = useSelector(state => state.profile?.update?.error);
  const updateLoading = useSelector(state =>
    Boolean(state.profile?.update?.loading),
  );

  const profile = useMemo(
    () => getProfileData(profileResponse),
    [profileResponse],
  );
  const activeIndex = SECTION_ORDER.indexOf(activeSection);
  const isFirstSection = activeIndex === 0;
  const isLastSection = activeIndex === SECTION_ORDER.length - 1;

  useEffect(() => {
    dispatch(resetProfileUpdate());
    dispatch(getMyProfile());

    return () => {
      dispatch(resetProfileUpdate());
    };
  }, [dispatch]);

  useEffect(() => {
    setForm(mapProfileToForm(profile));
    setErrors({});
  }, [profile]);

  useEffect(() => {
    if (!submittedRef.current || !updateResponse) return;

    submittedRef.current = false;

    const isSuccess =
      updateResponse.status === 'success' || updateResponse.success === true;

    if (isSuccess) {
      show.success(updateResponse.message || 'Profile updated successfully.');
      dispatch(resetProfileUpdate());
      dispatch(getMyProfile());
      return;
    }

    show.error(updateResponse.message || 'Unable to update profile.');
  }, [dispatch, updateResponse]);

  useEffect(() => {
    if (!submittedRef.current || !updateError) return;
    submittedRef.current = false;
  }, [updateError]);

  const setFieldError = useCallback(
    (key: keyof ProfileFormData, value: SetStateAction<string>) => {
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
    (key: keyof ProfileFormData, value: string | boolean | Date | null) => {
      setForm(current => ({
        ...current,
        [key]: value,
      }));
      setFieldError(key, '');
    },
    [setFieldError],
  );

  const clearDate = useCallback(
    (key: 'dob' | 'anniversary_date') => {
      setFormValue(key, null);
    },
    [setFormValue],
  );

  const validate = useCallback(() => {
    const nextErrors: ProfileFormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Full name is required';
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Mobile number is required';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email address is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const onNext = useCallback(() => {
    const nextSection = SECTION_ORDER[activeIndex + 1];

    if (nextSection) {
      setActiveSection(nextSection);
    }
  }, [activeIndex]);

  const onBack = useCallback(() => {
    const previousSection = SECTION_ORDER[activeIndex - 1];

    if (previousSection) {
      setActiveSection(previousSection);
    }
  }, [activeIndex]);

  const onSave = useCallback(() => {
    if (updateLoading || !validate()) {
      return;
    }

    const payload = buildUpdatePayload(form, profile);

    if (!Object.keys(payload).length) {
      show.info('No profile changes to update.');
      return;
    }

    submittedRef.current = true;
    dispatch(updateMyProfile(payload));
  }, [dispatch, form, profile, updateLoading, validate]);

  return {
    styles,
    colors,
    states: {
      form,
      errors,
      profile,
      activeSection,
      isFirstSection,
      isLastSection,
      profileLoading,
      updateLoading,
      sectionTabs: SECTION_TABS,
    },
    handlers: {
      setFormValue,
      setFieldError,
      clearDate,
      setActiveSection,
      onNext,
      onBack,
      onSave,
    },
  };
};

export default useProfile;
