import React from 'react';
import va from '@vercel/analytics';

interface Props {
  onClick: () => void;
}

export default function UndoChanges({ onClick }: Props) {
  return (
    <button
      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() => {
        onClick();
        va.track('Clicked - Undo all changes');
      }}
    >
      <svg
        className="w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26 26"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
      >
        <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" />
      </svg>
      <span>Undo Modifications</span>
    </button>
  );
}
