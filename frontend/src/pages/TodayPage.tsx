import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WordCard from '../components/WordCard';

const TodayPage: React.FC = () => {
  const [words,setWords]=useState<any[]>([]);
  useEffect(()=>{ axios.post(`${import.meta.env.VITE_API_URL}/api/words/generate`).then(r=>setWords(r.data)); },[]);
  return <div className="p-4 grid gap-4">
    {words.map((w,i)=><WordCard key={i} word={w.word} explanation="" examples={[]} audioUrl={w.audioUrl} imageUrl={w.imageUrl} onAdd={()=>{}} />)}
  </div>;
};
export default TodayPage;