// components/Spinner.tsx

import { useState, useEffect } from 'react';

type SpinnerProps = {
  delay: number; // delay in seconds
  name: string;
};

export const Spinner = ({ delay, name }: SpinnerProps) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return showSpinner ? (
    <>
      <div className="spinner">
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          {name}
        </div>
      </div>
    </>
  ) : null;
};