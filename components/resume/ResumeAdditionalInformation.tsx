import {
  ICertificationAndVolunteer,
  IResumeAdditionalInformation
} from '@/types';
import React from 'react';

export default function ResumeAdditionalInformation({
  certifications,
  volunteer
}: IResumeAdditionalInformation) {
  return (
    <div className="font-calibre">
      <h2 className="text-xl py-2 font-bold text-black-500">Certifications</h2>
      {certifications &&
        certifications.map(
          (certificationsExp: ICertificationAndVolunteer, index) => {
            return (
              <ul key={index} className="list-disc list-inside space-y-1">
                <li className="text-grey-300" key={index}>
                  {certificationsExp.name && <h4>{certificationsExp.name}</h4>}
                  {certificationsExp.issuer && (
                    <h4>{certificationsExp.issuer}</h4>
                  )}
                  {certificationsExp.year && <h4>{certificationsExp.year}</h4>}
                </li>
              </ul>
            );
          }
        )}

      <h2 className="text-xl py-2 font-bold text-black-500">
        Volunteer Experiences
      </h2>
      {volunteer &&
        volunteer.map((volunteerExp: ICertificationAndVolunteer, index) => {
          return (
            <ul key={index} className="list-disc list-inside space-y-1">
              <li className="text-grey-300" key={index}>
                {volunteerExp.name && <h4>{volunteerExp.name}</h4>}
                {volunteerExp.issuer && <h4>{volunteerExp.issuer}</h4>}
                {volunteerExp.year && <h4>{volunteerExp.year}</h4>}
              </li>
            </ul>
          );
        })}
    </div>
  );
}
