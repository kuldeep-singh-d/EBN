type ApiErrorResponse = {
  error?: string;
  message?: string;
  errors?: string[] | Record<string, string | string[]>;
};

const firstError = (errors: ApiErrorResponse['errors']): string | undefined => {
  if (Array.isArray(errors)) {
    return errors.find(error => Boolean(error));
  }

  if (errors && typeof errors === 'object') {
    for (const value of Object.values(errors)) {
      if (Array.isArray(value)) {
        const message = value.find(error => Boolean(error));
        if (message) return message;
      } else if (value) {
        return value;
      }
    }
  }

  return undefined;
};

export const getApiErrorMessage = (
  response?: ApiErrorResponse | string | null,
  fallback = 'Something went wrong. Please try again.',
): string => {
  if (typeof response === 'string' && response.trim()) return response;
  if (!response || typeof response !== 'object') return fallback;

  return (
    firstError(response.errors) || response.message || response.error || fallback
  );
};
