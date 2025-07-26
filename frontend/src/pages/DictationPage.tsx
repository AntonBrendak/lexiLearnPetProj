import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DictationPage: React.FC = () => {
  const [words,setWords]=useState<any[]>([]);
  const [idx,setIdx]=useState(0);
  const [input,setInput]=useState('');
  useEffect(()=>{ axios.get(`${import.meta.env.VITE_API_URL}/api/words/dictation`).then(r=>setWords(r.data)); },[]);
  const check=()=>{ if(input.toLowerCase()===words[idx].text.toLowerCase()){ alert('Correct'); } setIdx(idx+1); setInput(''); };
  if(!words.length) return <div>Loading...</div>;
  return <div className="p-4">
    <button onClick={()=>window.speechSynthesis.speak(new SpeechSynthesisUtterance(words[idx].text))}>🔊</button>
    <input value={input} onChange={e=>setInput(e.target.value)} />
    <button onClick={check}>Check</button>
    <div>{idx+1}/{words.length}</div>
  </div>;
};
export default DictationPage;