import React from 'react';
import { IResumeEducation } from '@/types';

interface Props {
  education: IResumeEducation[];
}

export default function EducationSection({ education }: Props) {
  return (
    <div className="font-calibre printable text-xs">
      <h1 className="text-lg py-2 font-bold text-black-500">Education</h1>
      <ul className="list-disc list-inside space-y-1 printable">
        {education &&
          education.map((educ, index) => {
            return (
              <div key={index} className="p-2 printable">
                <div className="printable">
                  <h1 className="text-md font-bold">{educ.degree}</h1>
                </div>

                <div className="text-xs flex justify-between printable">
                  <p className="font-bold">{educ.course}</p>
                  <p className="ml-auto">{educ.year}</p>
                </div>
                <div className="text-xs flex justify-between printable">
                  <p className="">{educ.institution}</p>
                  <p className="ml-auto ">{educ.city}</p>
                </div>
              </div>
            );
          })}
      </ul>
    </div>
  );
}
