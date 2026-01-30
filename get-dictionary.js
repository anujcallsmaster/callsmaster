import "server-only";

// We enumerate all dictionaries here for better linting and editor support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("@/app/dictionaries/en.json").then((module) => module.default),
  hi: () => import("@/app/dictionaries/hi.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  const loadDictionary = dictionaries[locale] ?? dictionaries.en;
  return loadDictionary();
};
