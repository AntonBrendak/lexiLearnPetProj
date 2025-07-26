import React from 'react';

type Props = {
  word: string;
  explanation: string;
  examples: string[];
  audioUrl?: string;
  imageUrl?: string;
  onAdd?: () => void;
};

const WordCard: React.FC<Props> = ({ word, explanation, examples, audioUrl, imageUrl, onAdd }) => {
  return (
    <div className="p-4 bg-white rounded shadow flex flex-col gap-2">
      <div className="flex items-center gap-4">
        {imageUrl && <img src={imageUrl} className="w-20 h-20 object-cover" />}
        <div className="text-xl font-semibold">{word}</div>
        {audioUrl && <audio controls src={audioUrl} />}
      </div>
      <div>{explanation}</div>
      <ul className="list-disc ml-4">
        {examples.map((ex,i)=><li key={i}>{ex}</li>)}
      </ul>
      {onAdd && <button onClick={onAdd} className="px-4 py-1 bg-blue-500 text-white rounded">Add</button>}
    </div>
  );
};

export default WordCard;