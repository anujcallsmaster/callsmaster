import {getRequestConfig} from 'next-intl/server';

// Provides messages for next-intl based on the active locale
export default getRequestConfig(async ({locale}) => {
  const safeLocale = locale ?? 'en';

  return {
    locale: safeLocale,
    messages: (await import(`../app/dictionaries/${safeLocale}.json`)).default,
  };
});
