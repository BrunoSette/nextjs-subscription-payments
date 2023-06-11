'use client';

import Menu from '@/components/ui/Menu/';
import Notification from '@/components/ui/Notification/Notification';
// import { useResume } from '@/contexts/ResumeContext';
// import { withAuth } from '@/utils/auth';
import { StepStatus } from '@/types';
// import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/navigation';
import React, { FormEvent, ChangeEvent, useState } from 'react';

// import { useUser } from '@/utils/useUser';
// import { getMaxResumeCreationsByPlan } from '@/utils/plans';

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   return await withAuth(ctx);
// };

export default function JobPost() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  //   const { saveJobPost, createResume, jobPost } = useResume();
  //   const { userDetails, subscription } = useUser();
  const [inputValue, setInputValue] = React.useState<string>('');

  //   const planName = subscription?.prices?.products?.name || 'Free';
  //   const maxResumeCreations = getMaxResumeCreationsByPlan(planName);
  //   const userCreatedResumeCount = userDetails?.resume_created_count || 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handlePost();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputValue(event.target.value);
    setShow(false);
  };

  //   const handlePost = (): void => {
  //     if (inputValue.trim() === '') {
  //       setShow(true);
  //     } else {
  //       if (jobPost.jobPost !== inputValue) {
  //         saveJobPost({ jobPost: inputValue });
  //       }

  //       if (
  //         maxResumeCreations > userCreatedResumeCount &&
  //         jobPost.jobPost !== inputValue
  //       ) {
  //         userDetails && createResume(userDetails.id);
  //       }

  //       router.push('/profile');
  //     }
  //   };

  //   React.useEffect(() => {
  //     setInputValue(jobPost.jobPost);
  //   }, [jobPost]);

  const stepStatuses: { [id: string]: StepStatus } = {
    '01': 'complete',
    '02': 'current'
  };
  return (
    <>
      <Menu stepStatuses={stepStatuses} />
      {show && (
        <Notification
          headline="Atention!"
          message="You need to paste your job post."
          type="warning"
        />
      )}
      <div className="md:flex md:items-center bg-white md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight pl-10 pt-10">
            Copy and paste you Job Post
          </h2>
        </div>
      </div>
      <div className="flex items-start space-x-4 bg-white p-10">
        <div className="flex-shrink-0"></div>
        <div className="min-w-0 flex-1">
          <form onSubmit={handleSubmit} className="relative">
            <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <label htmlFor="comment" className="sr-only">
                Paste here your Job Post
              </label>
              <textarea
                rows={10}
                name="jobpost"
                id="jobpost"
                className="block w-full resize-none text-black	 border-0 py-3 focus:ring-0 sm:text-sm"
                placeholder="Paste here your job post..."
                value={inputValue}
                onChange={handleChange}
              />

              <div className="py-2" aria-hidden="true">
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <div className="flex items-center space-x-5"></div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save Job Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
