import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

// Locale-specific layout that wraps the route tree with next-intl
export default async function LocaleLayout({ children, params }) {
  const { lang } =  await params;

  let messages;
  try {
    // Load the JSON dictionary that matches the current locale
    messages = (await import(`../dictionaries/${lang}.json`)).default;
  } catch (error) {
    // If the locale file doesn't exist, render the 404 page
    notFound();
  }

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <div className='m-12' >
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
