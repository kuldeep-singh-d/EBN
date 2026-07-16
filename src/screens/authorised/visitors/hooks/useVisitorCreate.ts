import moment from 'moment';
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useDispatch, useSelector } from '@hooks';
import { show } from '@utils/helpers';
import type { DropdownItem } from '@components/form/appDropdown/types';
import {
  getCategoriesDropdown,
  getSubCategoriesDropdown,
  resetSubCategoriesDropdown,
} from '@store/slices/app/dropdowns/dropdowns';
import {
  createVisitorInvitation,
  resetCreateVisitorInvitation,
} from '@store/slices/app/visitorInvitations/visitorInvitations';
import type {
  CreateVisitorInvitationResponse,
  VisitorDropdownResponse,
  VisitorFormData,
  VisitorFormErrors,
} from '../types';

const PAYMENT_MODE = 'paid_at_venue';

const INITIAL_FORM: VisitorFormData = {
  fullName: '',
  email: '',
  mobileNumber: '',
  whatsappNumber: '',
  companyName: '',
  gstNumber: '',
  invitationDate: null,
  categoryId: '',
  categoryName: '',
  subCategoryId: '',
  subCategoryName: '',
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const normalizePhone = (value: string) => value.replace(/\D/g, '');

const toDropdownItems = (
  response: VisitorDropdownResponse | undefined,
): DropdownItem[] =>
  (response?.data ?? []).map(item => ({
    label: item.name,
    value: String(item.id),
  }));

const useVisitorCreate = (onCreated: () => void) => {
  const dispatch = useDispatch();
  const submittedRef = useRef(false);
  const [form, setForm] = useState<VisitorFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<VisitorFormErrors>({});

  const categoriesResponse = useSelector(
    state => state.dropdowns?.categories?.data,
  ) as VisitorDropdownResponse | undefined;
  const subCategoriesResponse = useSelector(
    state => state.dropdowns?.subCategories?.data,
  ) as VisitorDropdownResponse | undefined;
  const createResponse = useSelector(
    state => state.visitorInvitations?.create?.data,
  ) as CreateVisitorInvitationResponse | undefined;
  const createError = useSelector(
    state => state.visitorInvitations?.create?.error,
  );

  const categoryLoading = useSelector(state =>
    Boolean(state.dropdowns?.categories?.loading),
  );
  const subCategoryLoading = useSelector(state =>
    Boolean(state.dropdowns?.subCategories?.loading),
  );
  const createLoading = useSelector(state =>
    Boolean(state.visitorInvitations?.create?.loading),
  );

  const categoryOptions = useMemo(
    () => toDropdownItems(categoriesResponse),
    [categoriesResponse],
  );
  const subCategoryOptions = useMemo(
    () => toDropdownItems(subCategoriesResponse),
    [subCategoriesResponse],
  );

  const selectedCategory = useMemo(
    () =>
      form.categoryId
        ? { label: form.categoryName, value: form.categoryId }
        : null,
    [form.categoryId, form.categoryName],
  );

  const selectedSubCategory = useMemo(
    () =>
      form.subCategoryId
        ? { label: form.subCategoryName, value: form.subCategoryId }
        : null,
    [form.subCategoryId, form.subCategoryName],
  );

  const canSubmit = useMemo(() => {
    const mobileNumber = normalizePhone(form.mobileNumber);
    const whatsappNumber = normalizePhone(form.whatsappNumber);

    return Boolean(
      form.fullName.trim() &&
        mobileNumber.length >= 10 &&
        (!whatsappNumber || whatsappNumber.length >= 10) &&
        isValidEmail(form.email) &&
        form.invitationDate &&
        form.categoryId &&
        form.subCategoryId &&
        !createLoading,
    );
  }, [
    createLoading,
    form.categoryId,
    form.email,
    form.fullName,
    form.invitationDate,
    form.mobileNumber,
    form.subCategoryId,
    form.whatsappNumber,
  ]);

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors({});
    dispatch(resetSubCategoriesDropdown());
    dispatch(resetCreateVisitorInvitation());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetCreateVisitorInvitation());
    dispatch(resetSubCategoriesDropdown());
    dispatch(getCategoriesDropdown());

    return () => {
      dispatch(resetCreateVisitorInvitation());
      dispatch(resetSubCategoriesDropdown());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!submittedRef.current || !createResponse) return;

    submittedRef.current = false;

    const isSuccess =
      createResponse.status === 'success' ||
      (createResponse as any).success === true;

    if (isSuccess) {
      show.success(
        createResponse.message ||
          'Elite Visitor Invitation successfully created.',
      );
      resetForm();
      onCreated();
      return;
    }

    show.error(
      createResponse.message || 'Unable to create visitor invitation.',
    );
  }, [createResponse, onCreated, resetForm]);

  useEffect(() => {
    if (!submittedRef.current || !createError) return;
    submittedRef.current = false;
  }, [createError]);

  const setFieldError = useCallback(
    (key: keyof VisitorFormData, value: SetStateAction<string>) => {
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
    (key: keyof VisitorFormData, value: string) => {
      const nextValue = key === 'gstNumber' ? value.toUpperCase() : value;

      setForm(current => ({
        ...current,
        [key]: nextValue,
      }));
      setFieldError(key, '');
    },
    [setFieldError],
  );

  const setInvitationDate = useCallback(
    (date: Date) => {
      setForm(current => ({
        ...current,
        invitationDate: date,
      }));
      setFieldError('invitationDate', '');
    },
    [setFieldError],
  );

  const clearInvitationDate = useCallback(() => {
    setForm(current => ({
      ...current,
      invitationDate: null,
    }));
  }, []);

  const setCategory = useCallback(
    (item: DropdownItem | null) => {
      setForm(current => ({
        ...current,
        categoryId: item?.value ?? '',
        categoryName: item?.label ?? '',
        subCategoryId: '',
        subCategoryName: '',
      }));
      setFieldError('categoryId', '');
      setFieldError('subCategoryId', '');

      if (item) {
        dispatch(resetSubCategoriesDropdown());
        dispatch(getSubCategoriesDropdown(item.value));
      } else {
        dispatch(resetSubCategoriesDropdown());
      }
    },
    [dispatch, setFieldError],
  );

  const setSubCategory = useCallback(
    (item: DropdownItem | null) => {
      setForm(current => ({
        ...current,
        subCategoryId: item?.value ?? '',
        subCategoryName: item?.label ?? '',
      }));
      setFieldError('subCategoryId', '');
    },
    [setFieldError],
  );

  const validateForm = useCallback(() => {
    const nextErrors: VisitorFormErrors = {};
    const mobileNumber = normalizePhone(form.mobileNumber);
    const whatsappNumber = normalizePhone(form.whatsappNumber);
    const normalizedEmail = form.email.trim();

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Full name is required';
    }

    if (!mobileNumber) {
      nextErrors.mobileNumber = 'Mobile number is required';
    } else if (mobileNumber.length < 10) {
      nextErrors.mobileNumber = 'Enter a valid mobile number';
    }

    if (whatsappNumber && whatsappNumber.length < 10) {
      nextErrors.whatsappNumber = 'Enter a valid WhatsApp number';
    }

    if (!normalizedEmail) {
      nextErrors.email = 'Email is required';
    } else if (!isValidEmail(normalizedEmail)) {
      nextErrors.email = 'Enter a valid email';
    }

    if (!form.invitationDate) {
      nextErrors.invitationDate = 'Invitation date is required';
    }

    if (!form.categoryId) {
      nextErrors.categoryId = 'Chapter is required';
    }

    if (!form.subCategoryId) {
      nextErrors.subCategoryId = 'Sub-Chapter is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const onSubmit = useCallback(() => {
    if (createLoading || !validateForm() || !form.invitationDate) {
      return;
    }

    const mobileNumber = normalizePhone(form.mobileNumber);
    const whatsappNumber = normalizePhone(form.whatsappNumber);

    submittedRef.current = true;
    dispatch(
      createVisitorInvitation({
        full_name: form.fullName.trim(),
        company_name: form.companyName.trim(),
        mobile_no: mobileNumber,
        whatsapp_no: whatsappNumber || mobileNumber,
        email: form.email.trim(),
        gst_no: form.gstNumber.trim().toUpperCase(),
        invitation_date: moment(form.invitationDate).format('YYYY-MM-DD'),
        category_id: Number(form.categoryId),
        sub_category_id: Number(form.subCategoryId),
        payment_mode: PAYMENT_MODE,
      }),
    );
  }, [createLoading, dispatch, form, validateForm]);

  return {
    states: {
      canSubmit,
      categoryLoading,
      categoryOptions,
      createLoading,
      errors,
      form,
      selectedCategory,
      selectedSubCategory,
      subCategoryLoading,
      subCategoryOptions,
    },
    handlers: {
      clearInvitationDate,
      onSubmit,
      setCategory,
      setFieldError,
      setFormValue,
      setInvitationDate,
      setSubCategory,
    },
  };
};

export default useVisitorCreate;
