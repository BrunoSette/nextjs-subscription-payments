import React from 'react';
// import { useResume } from '@/contexts/ResumeContext';
import Link from 'next/link';

interface Props {
  userId: string;
}

export default function ResumeErrorMessage({ userId }: Props) {
  // const { createResume } = useResume();

  const handleTryAgain = () => {
    // createResume(userId);
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
        An error has occurred
      </h2>

      <p className="text-lg">Please check the information provided:</p>

      <div className="space-y-4">
        <Link
          href="/resume"
          className="flex items-center p-4 text-md text-gray-700 bg-gray-50 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
        >
          Review Step One - You must provide your old Resume.
        </Link>

        <Link
          href="/jobpost"
          className="flex items-center p-4 text-md text-gray-700 bg-gray-50 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
        >
          Review Step Two - You must provide the Job Post you want to apply.
        </Link>
      </div>

      <p className="text-2xl">Or just try again:</p>

      <button
        className="w-100 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleTryAgain}
      >
        Try generate my resume again
      </button>
    </div>
  );
}
