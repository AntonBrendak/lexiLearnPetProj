import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WordCard from '../components/WordCard';

const LibraryPage: React.FC = () => {
  const [words,setWords]=useState<any[]>([]);
  useEffect(()=>{ axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`).then(r=>setWords(r.data.knownWords || [])); },[]);
  return <div className="p-4 grid gap-4">
    {words.map((w,i)=><WordCard key={i} word={w.text} explanation={w.explanation} examples={w.examples} audioUrl={w.audioUrl} imageUrl={w.imageUrl} />)}
  </div>;
};
export default LibraryPage;