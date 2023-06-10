"use client"

import React, { useState } from 'react';
// import { GetServerSidePropsContext } from 'next';
// import { addResumeCreatedCount } from '@/utils/supabase-client';
// import CenteredAlert from '@/components/ui/Alert/CenteredSingleAction';
// import { withAuthAndSubscription } from '@/utils/auth';
import Menu from '@/components/ui/Menu/';
import { Spinner } from '@/components/ui/Spinner/Spinner';
// import { useResume } from '@/contexts/ResumeContext';
// import ResumeErrorMessage from '@/components/resume/ResumeErrorMessage';
import { StepStatus } from '@/types';
import CenteredAlert from '@/components/ui/Alert/CenteredSingleAction';
import EditableResume from '@/components/resume/EditableResume';
import ResumeErrorMessage from '@/components/resume/ResumeErrorMessage';
import { useUser } from '@supabase/auth-ui-react/dist/components/Auth/UserContext';
// import { useUser } from '@/utils/useUser';
// import EditableResume from '@/components/resume/EditableResume';
// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   return await withAuthAndSubscription(ctx);
// };

export default function Results({}) {
//   const { error, validationErrors, isGPTCreatingResume, isResumeStored } = useResume();
//   const { userDetails } = useUser();

  const stepStatuses: { [id: string]: StepStatus } = {
    '01': 'complete',
    '02': 'complete',
    '03': 'complete',
    '04': 'current'
  };

  const [showAlert, setShowAlert] = useState(false);

//   console.log("API Errors:", error);
//   console.log("Validation Errors:", validationErrors);

  return (
    <>
      <Menu stepStatuses={stepStatuses} />
      <div className="bg-white p-10">
        <div className="text-gray-900">
          {/* {isGPTCreatingResume ? ( */}
            <>
              <div className="md:flex md:items-center bg-white md:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Creating your new Resume
                  </h2>
                </div>
              </div>
              <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400 p-10">
                <li className="flex ">
                  <div role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <div className="space-y-6">
                    Preparing your new resume
                    <div className="pt-5">
                      <Spinner
                        name="Inserted you personal information"
                        delay={5}
                      />
                      <Spinner name="Uploaded your resume" delay={10} />
                      <Spinner name="Inserted your job post" delay={15} />
                      <Spinner name="Creating your profile" delay={26} />
                      <Spinner name="Passing your experiences" delay={30} />
                      <Spinner name="Using AI" delay={40} />
                      <Spinner name="Processing the data" delay={50} />
                      <Spinner name="Preparing to receive data" delay={55} />
                      <Spinner name="Receiving the data" delay={58} />
                    </div>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* {isResumeStored ? ( */}
                <>
                  <CenteredAlert
                    button="Ok"
                    message="Here is your resume tailored to the job offer. Please remember that we used artificial intelligence to build this resume, and while we strive for perfection, we are not flawless. Please review it carefully before submitting."
                    headline="Congratulations!"
                    hide={() => setShowAlert(true)}
                  />
                  <EditableResume />
                </>
              ) : (
                {/* userDetails && <ResumeErrorMessage userId={userDetails.id} /> */}
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
