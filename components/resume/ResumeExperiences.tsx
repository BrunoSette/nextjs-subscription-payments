import React from 'react';
import { IResumeWorkExperiences } from '@/types';

interface Props {
  experiences: IResumeWorkExperiences[];
}

export default function ResumeExperiences({ experiences }: Props) {
  return (
    <div className="font-calibre printable ">
      <h1 className="text-lg py-3 font-bold text-black-500">
        Professional Experience
      </h1>

      {experiences &&
        experiences.map((exp, index) => {
          return (
            <div key={index} className="font-calibre p-2 text-sm">
              <div className="flex justify-between">
                <h1 className="text-sm font-bold">{exp.role}</h1>
                <p className="ml-auto text-xs">
                  {exp.date_in} - {exp.date_out}
                </p>
              </div>

              <div className="text-xs flex justify-between printable">
                <p className="font-bold text-sm">{exp.company}</p>
                <p className="ml-auto"> {exp.city}</p>
              </div>

              <ul className="list-disc list-inside text-xs printable">
                {exp.achievements &&
                  exp.achievements.map((achievement, i) => {
                    return (
                      <li className="" key={i}>
                        {achievement}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
    </div>
  );
}
