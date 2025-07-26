import { useEffect, useState } from 'react';
import en from '../locales/en.json';
import uk from '../locales/uk.json';
import ru from '../locales/ru.json';

const locales = { en, uk, ru };

export default function useLocale() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  useEffect(() => {
    const handler = () => setLang(localStorage.getItem('lang') || 'en');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);
  return locales[lang] || en;
}