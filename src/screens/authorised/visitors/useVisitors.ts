import { useCallback, useMemo, useState } from 'react';

import useStyles from './styles';
import type { VisitorFormData, VisitorsData } from './types';

const INITIAL_FORM: VisitorFormData = {
  firstName: '',
  lastName: '',
  email: '',
  whatsappNumber: '',
  companyName: '',
  gstNumber: '',
  invitationMeetingDate: '',
  chapterName: '',
};

const useVisitors = () => {
  const styles = useStyles();
  const [form, setForm] = useState<VisitorFormData>(INITIAL_FORM);

  const screenData: VisitorsData = useMemo(
    () => ({
      title: 'Register a Visitor',
      form,
    }),
    [form],
  );

  const canSubmit = useMemo(() => {
    const email = form.email.trim();

    return email.length > 0 && email.includes('@');
  }, [form.email]);

  const setFormValue = useCallback(
    (key: keyof VisitorFormData, value: string) => {
      setForm(current => ({
        ...current,
        [key]: value,
      }));
    },
    [],
  );

  const onContactPress = useCallback(() => {
    console.log('[Visitors] open contact picker');
  }, []);

  const onDatePress = useCallback(() => {
    console.log('[Visitors] select invitation meeting date');
  }, []);

  const onChapterPress = useCallback(() => {
    console.log('[Visitors] select chapter');
  }, []);

  const onSubmit = useCallback(() => {
    if (!canSubmit) {
      return;
    }

    console.log('[Visitors] submit visitor form', form);
  }, [canSubmit, form]);

  return {
    styles,
    states: {
      canSubmit,
      screenData,
    },
    handlers: {
      onChapterPress,
      onContactPress,
      onDatePress,
      onSubmit,
      setFormValue,
    },
    constants: {},
  };
};

export default useVisitors;
