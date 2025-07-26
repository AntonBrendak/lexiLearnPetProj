import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ProfilePage: React.FC = () => {
  const [profile,setProfile]=useState<any>(null);
  const { t } = useTranslation();
  useEffect(()=>{ axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`).then(r=>setProfile(r.data)); },[]);
  if(!profile) return <div>{t('loading')}</div>;
  return <div className="p-6 max-w-md mx-auto">
    <h1>{t('profile')}: {profile.name}</h1>
    <p>{t('known_words')}: {profile.knownWords.length}</p>
    <p>{t('learned_words')}: {profile.learnedWordsCount}</p>
    <p>{t('level')}: {profile.languageLevel}</p>
    <p>{t('rank')}: {profile.rank}</p>
  </div>;
};
export default ProfilePage;