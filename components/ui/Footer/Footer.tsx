import Logo from '@/components/icons/Logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-12 gap-8 border-b border-zinc-600 py-12 text-white transition-colors duration-150 bg-zinc-900">
        <div className="col-span-2 lg:col-span-2">
          <Link
            href="/"
            className="flex flex-initial items-center font-bold md:mr-24"
          >
            <span className="rounded-full border border-zinc-700 mr-2">
              <Logo />
            </span>
            <span>My Job Upgrade</span>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Home
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/account"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Account
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/resume"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Resume
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="text-white font-bold hover:text-zinc-200 transition ease-in-out duration-150">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/privacypolicy"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/terms"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 lg:col-span-6 flex items-start lg:justify-end text-white"></div>
      </div>
      <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4 bg-zinc-900">
        <div>
          <span>&copy; 2023 My Job Upgrade. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
