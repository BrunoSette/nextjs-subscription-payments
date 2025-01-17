import { StepStatus } from '@/types';
import { CheckIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface MenuProps {
  stepStatuses: { [id: string]: StepStatus };
}

interface Step {
  id: string;
  name: string;
  description: string;
  href: string;
  status: StepStatus;
}
const Menu: React.FC<MenuProps> = ({ stepStatuses }) => {
  const steps: Step[] = [
    {
      id: '01',
      name: 'Resume',
      description: 'Your Resume',
      href: '/resume',
      status: stepStatuses['01'] || 'upcoming'
    },
    {
      id: '02',
      name: 'Job Post',
      description: 'Your Job Post',
      href: '/jobpost',
      status: stepStatuses['02'] || 'upcoming'
    },
    {
      id: '03',
      name: 'Profile',
      description: 'You Information',
      href: '/profile',
      status: stepStatuses['03'] || 'upcoming'
    },
    {
      id: '04',
      name: 'Results',
      description: 'Final Magic',
      href: '/results',
      status: stepStatuses['04'] || 'upcoming'
    }
  ];

  return (
    <>
      <div className="lg:border-t bg-white lg:border-b lg:border-gray-200">
        <nav aria-label="Progress">
          <ol
            role="list"
            className="divide-y divide-gray-300 rounded-md border border-gray-300 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="relative md:flex md:flex-1">
                {step.status === 'complete' ? (
                  <Link
                    href={step.href}
                    className="group flex w-full items-center"
                  >
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                        <CheckIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </Link>
                ) : step.status === 'current' ? (
                  <Link
                    href={step.href}
                    className="flex items-center px-6 py-4 text-sm font-medium"
                    aria-current="step"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                      <span className="text-indigo-600">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-indigo-600">
                      {step.name}
                    </span>
                  </Link>
                ) : (
                  <Link href={step.href} className="group flex items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                        <span className="text-gray-500 group-hover:text-gray-900">
                          {step.id}
                        </span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </Link>
                )}

                {stepIdx !== steps.length - 1 ? (
                  <>
                    <div
                      className="absolute top-0 right-0 hidden h-full w-5 md:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
};

export default Menu;
