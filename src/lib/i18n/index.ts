import { translations, SupportedLanguage, SUPPORTED_LANGUAGES, LanguageOption } from './translations';
import { NotificationItem } from '../../types';
export * from './culinaryTranslations';

export { translations, SUPPORTED_LANGUAGES };
export type { SupportedLanguage, LanguageOption };

export function getTranslation(key: string, lang: SupportedLanguage = 'en'): string {
  const langDict = translations[lang] || translations.en;
  return langDict[key] || translations.en[key] || key;
}

export function getLanguageOption(code: SupportedLanguage): LanguageOption {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
}

export function localizeTimestamp(timestamp: string, lang: SupportedLanguage): string {
  const dict = translations[lang] || translations.en;
  const lower = timestamp.toLowerCase();
  if (lower.includes('just now') || lower.includes('now')) return dict.notif_time_just_now || timestamp;
  if (lower.includes('15 minute') || lower.includes('15m')) return dict.notif_time_15m || timestamp;
  if (lower.includes('2 hour') || lower.includes('2h')) return dict.notif_time_2h || timestamp;
  if (lower.includes('1 day') || lower.includes('1d')) return dict.notif_time_1d || timestamp;
  if (lower.includes('2 day') || lower.includes('2d')) return dict.notif_time_2d || timestamp;
  return timestamp;
}

export function localizeNotification(
  notif: NotificationItem,
  lang: SupportedLanguage
): { title: string; message: string; timestamp: string } {
  const dict = translations[lang] || translations.en;

  // 1. Explicit i18n keys
  if (notif.titleKey && dict[notif.titleKey]) {
    let title = dict[notif.titleKey];
    let msg = notif.messageKey && dict[notif.messageKey] ? dict[notif.messageKey] : notif.message;
    if (notif.params) {
      for (const [k, v] of Object.entries(notif.params)) {
        msg = msg.replace(`{${k}}`, v);
        title = title.replace(`{${k}}`, v);
      }
    }
    return {
      title,
      message: msg,
      timestamp: localizeTimestamp(notif.timestamp, lang),
    };
  }

  // 2. Default initial notifications by ID
  if (notif.id === 'notif_01') {
    return {
      title: dict.notif_like_title || notif.title,
      message: dict.notif_01_msg || notif.message,
      timestamp: dict.notif_time_15m || notif.timestamp,
    };
  }
  if (notif.id === 'notif_02') {
    return {
      title: dict.notif_gen_title || notif.title,
      message: dict.notif_02_msg || notif.message,
      timestamp: dict.notif_time_2h || notif.timestamp,
    };
  }
  if (notif.id === 'notif_03') {
    return {
      title: dict.notif_rec_title || notif.title,
      message: dict.notif_03_msg || notif.message,
      timestamp: dict.notif_time_1d || notif.timestamp,
    };
  }
  if (notif.id === 'notif_04') {
    return {
      title: dict.notif_save_title || notif.title,
      message: dict.notif_04_msg || notif.message,
      timestamp: dict.notif_time_2d || notif.timestamp,
    };
  }

  // 3. AI Generated recipe notifications
  if (notif.type === 'generated' && dict.notif_gen_success_title) {
    const title = dict.notif_gen_success_title;
    const msgTemplate = dict.notif_gen_success_msg || notif.message;
    const match = notif.message.match(/"([^"]+)"/);
    const recipeName = match ? match[1] : '';
    const message = recipeName ? msgTemplate.replace('{title}', recipeName) : notif.message;
    return {
      title,
      message,
      timestamp: localizeTimestamp(notif.timestamp, lang),
    };
  }

  return {
    title: notif.title,
    message: notif.message,
    timestamp: localizeTimestamp(notif.timestamp, lang),
  };
}
