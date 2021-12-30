const langMap: any = {
  vi: "Tiếng Việt",
  en: "English",
  ja: "日本語"
}

export const getLangName = (langCode: string): string => {
  if (langCode in langMap) {
    return langMap[langCode];
  }
  return langCode;
}
