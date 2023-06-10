import React from 'react';

interface Props {
  profile: string[];
}

export default function ResumeProfile({ profile }: Props) {
  const bulletPoints: string[] = [];

  for (var item of profile) {
    if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
      // IS OBJECT
      item as object;
      const key = Object.keys(item)[0];
      if (Array.isArray(item[key])) {
        const arr: string[] = item[key];
        arr.forEach((elem) => bulletPoints.push(elem));
      }
    } else {
      item as string;
      bulletPoints.push(item);
    }
  }

  return (
    <div className="printable font-calibre">
      <h1 className="text-lg py-1 font-bold text-black-500">Profile</h1>
      <ul className="list-disc list-inside text-xs P-2 space-y-1 printable">
        {bulletPoints &&
          bulletPoints.map((bullet_point, index) => {
            return (
              <li className="text-grey-300 font-calibre" key={index}>
                {bullet_point}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
