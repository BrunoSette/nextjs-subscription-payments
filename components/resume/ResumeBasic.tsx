import React from 'react';
import { useResume } from '@/contexts/ResumeContext';

export default function ResumeBasic() {
  const { personalInfo } = useResume();

  if (!personalInfo) return <></>;

  return (
    <div className="font-calibre printable text-xs">
      <h1 className="text-lg py-1 font-bold text-black-500">
        {personalInfo.fName} {personalInfo.lName}
      </h1>
      <p>
        {personalInfo.city}, {personalInfo.region} - {personalInfo.phone} -{' '}
        {personalInfo.email}
      </p>
      <p>{personalInfo.linkedin && <p>Linkedin: {personalInfo.linkedin}</p>}</p>
      <p>
        {personalInfo.portfolio && <p>Portfolio: {personalInfo.portfolio}</p>}
      </p>
      <p>{personalInfo.website && <p>Website: {personalInfo.website}</p>}</p>
    </div>
  );
}
