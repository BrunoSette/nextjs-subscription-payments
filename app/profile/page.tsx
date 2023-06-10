"use client"

import React, { FormEvent, ChangeEvent, useState } from 'react';
// import { GetServerSidePropsContext } from 'next';
import Router, { useRouter } from 'next/router';
import va from '@vercel/analytics';
import Notification from '@/components/ui/Notification/Notification';

import { IPersonalInfo, StepStatus } from '@/types';
// import { createEmptyPersonalInfo, useResume } from '@/contexts/ResumeContext';
import { countries } from '@/utils/countries';
// import { withAuth } from '@/utils/auth';
import Menu from '@/components/ui/Menu/';
// import { useUser } from '@/utils/useUser';
import { getMaxResumeCreationsByPlan } from '@/utils/plans';

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   return await withAuth(ctx);
// };

export default function Profile() {
//   const {
//     createResume,
//     savePersonalInfo,
//     personalInfo: storedPersonalInfo
//   } = useResume();
//   const { userDetails, subscription } = useUser();
//   const router = useRouter();

//   const [personalInfo, setPersonalInfo] = React.useState<IPersonalInfo>(
//     createEmptyPersonalInfo
//   );

//   const planName = subscription?.prices?.products?.name || 'Free';
//   const maxResumeCreations = getMaxResumeCreationsByPlan(planName);
//   const userCreatedResumeCount = userDetails?.resume_created_count || 0;
  const [show, setShow] = useState(false);

//   const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
//     event?.preventDefault();
//     if (
    //   personalInfo.fName.trim() === '' ||
    //   personalInfo.lName.trim() === '' ||
    //   personalInfo.email.trim() === '' ||
    //   personalInfo.phone.trim() === ''
    // ) {
    //   setShow(true);
    // } else {
    //   if (maxResumeCreations > userCreatedResumeCount) {
    //     router.push('/results');
    //   } else {
    //     const msg =
    //       `You've reached your resume creation limit, consider subscribe or upgrade your plan for more resume creations. The ${planName} plan has ${maxResumeCreations} resume creations.` as string;
    //     Router.push({
    //       pathname: '/plans',
    //       query: { message: msg }
    //     });
    //   }
    // }
//   };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const name = event.target.name;
    const value = event.target.value;
    // setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    setShow(false);
  };

//   const handleSave = (): void => {
//     savePersonalInfo(personalInfo);
//   };

//   React.useEffect(() => {
//     setPersonalInfo((prev) => ({ ...prev, ...storedPersonalInfo }));
//   }, [storedPersonalInfo]);

  const stepStatuses: { [id: string]: StepStatus } = {
    '01': 'complete',
    '02': 'complete',
    '03': 'current'
  };

  return (
    <>
      <Menu stepStatuses={stepStatuses} />
      {show && (
        <Notification
          headline="Atention!"
          message="You need to enter your personal information to continue."
          type="warning"
        />
      )}
      <form
        // onSubmit={handleSubmit}
        className="space-y-8 bg-white p-10 divide-y divide-gray-200 text-gray-900"
      >
        <div className="space-y-8 ">
          <div>
            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight  pt-5">
                Personal Information
              </h2>
              <p className=" text-gray-500 sm:truncate sm:text-sm sm:tracking-tight  pt-2">
                We will use this info to create your resume
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="fName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="fName"
                  id="first-name"
                //   value={personalInfo.fName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lName"
                  id="last-name"
                //   value={personalInfo.lName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="email"
                  id="email"
                //   value={personalInfo.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700"
              >
                Linkedin URL
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                //   value={personalInfo.linkedin}
                  onChange={handleChange}
                  autoComplete="linkedin"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                //   value={personalInfo.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="portfolio"
                className="block text-sm font-medium text-gray-700"
              >
                Portfolio Link (optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="portfolio"
                  id="portfolio"
                //   value={personalInfo.portfolio}
                  onChange={handleChange}
                  autoComplete="portfolio"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                Website (optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="website"
                  id="website"
                //   value={personalInfo.website}
                  onChange={handleChange}
                  autoComplete="website"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="city"
                  id="city"
                //   value={personalInfo.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                State / Province
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="region"
                  id="region"
                //   value={personalInfo.region}
                  onChange={handleChange}
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postalcode"
                className="block text-sm font-medium text-gray-700"
              >
                ZIP / Postal code
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="postalcode"
                  id="postal-code"
                //   value={personalInfo.postalcode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <div className="mt-1">
                <select
                  id="country"
                  name="country"
                  onChange={handleChange}
                //   value={personalInfo.country}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                // handleSave();
                va.track('Click - Save and Create my Resume');
              }}
            >
              Save and Create my Resume
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
