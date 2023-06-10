import { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import GoogleDriveButton from '@/components/GoogleDriveButton';

// Custom styled button component
interface CustomButtonProps {
  children: ReactNode;
  href?: string;
  download?: string;
  onClick?: () => void;
}

const CustomButton = ({ children, href, download, onClick }: CustomButtonProps) => (
  <a
    className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 my-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    onClick={onClick}
    href={href}
    download={download}
  // aria-label={children}
  >
    {children}
  </a>
);


interface DropdownProps {
  slateResume: object[];
  resumeHTMLWord: string;
  resumeHTMLDrive: string;
}

export default function Dropdown({ slateResume, resumeHTMLWord, resumeHTMLDrive }: DropdownProps) {
  return (
    <Menu
      as="div"
      className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div>
        <Menu.Button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Export to
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute w-56 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <CustomButton
                href={
                  'data:application/vnd.ms-word;charset=utf-8,' +
                  encodeURIComponent(resumeHTMLWord)
                }
                download="My new Resume.doc"
              >
                Word DOC
              </CustomButton>
            </Menu.Item>
            <Menu.Item>
              <GoogleDriveButton
                resume={resumeHTMLDrive}
                fileName="My New Resume"
              />
            </Menu.Item>
            <Menu.Item>
              <CustomButton onClick={() => window.print()}>PDF</CustomButton>
            </Menu.Item>
            <Menu.Item>
              <CustomButton
                href={
                  'data:text/plain;charset=utf-8,' +
                  encodeURIComponent(JSON.stringify(slateResume, null, 4))
                }
                download="My Resume.json"
              >
                JSON
              </CustomButton>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
