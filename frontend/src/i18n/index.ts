import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import uk from './uk.json';
import ru from './ru.json';

i18n.use(initReactI18next).init({
  resources: { en:{translation:en}, uk:{translation:uk}, ru:{translation:ru} },
  lng: 'en',
  fallbackLng: 'en',
  interpolation:{escapeValue:false}
});
export default i18n;