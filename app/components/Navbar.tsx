'use client';
import { useAuthStore } from '@/app/store/useAuthStore';
import { LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from './theme-context';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const github_username = user?.github_username || '';

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data.type === 'AUTH_SUCCESS'
      ) {
        // Refresh the page to update the UI
        window.location.reload();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      clearUser();
      router.push('/');
    }
  };
  const { classes } = useTheme();

  return (
    <div className="fixed top-4 left-0 flex w-full justify-center z-50">
      <nav
        className={`w-11/12 rounded-2xl  border-b  ${classes.cardBg}
    ${classes.cardBorder} z-50 backdrop-blur-2xl`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div
              className="shrink-0"
              aria-label="Home"
            >
              <Link
                href="/"
                aria-label="Home"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg sm:h-12 sm:w-12">
                  <Image
                    src="/acmlogonew.webp"
                    alt="ACM Logo"
                    width={48}
                    height={48}
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="flex space-x-4">
                <NavLink
                  href="/rules"
                  textClass={classes.cardText}
                >
                  Rules
                </NavLink>
                <NavLink
                  href="/repo"
                  textClass={classes.cardText}
                >
                  Repositories
                </NavLink>
                <NavLink
                  href="/bot-commands"
                  textClass={classes.cardText}
                >
                  Bot Commands
                </NavLink>
                <NavLink
                  href="/resources"
                  textClass={classes.cardText}
                >
                  Resources
                </NavLink>
                <NavLink
                  href="/team"
                  textClass={classes.cardText}
                >
                  Team
                </NavLink>
                <NavLink
                  href="/past-editions"
                  textClass={classes.cardText}
                >
                  Past Editions
                </NavLink>
              </div>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center">
              {user && (
                <>
                  <button
                    type="button"
                    onClick={() => router.push(`/profile/${github_username}`)}
                    className="cursor-pointer flex items-center gap-2 rounded-l-full bg-white px-2 py-1 text-base font-semibold text-gray-800 shadow transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <img
                      src={`https://github.com/${user.github_username}.png`}
                      alt={user.github_username}
                      className="h-8 w-8 rounded-full border border-gray-200"
                    />
                    <span className="font-semibold lg:block hidden">
                      {user.github_username}
                    </span>
                  </button>
                  <div className="cursor-pointer flex items-center justify-center bg-red-200 rounded-r-full px-2 py-3 transition-all duration-200 ease-in-out hover:shadow-md">
                    <LogOut
                      color="red"
                      onClick={handleLogout}
                      className="h-4 w-4"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className={'flex items-center md:hidden '}>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}

        {/* Mobile Menu - Proper Extension */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-500 ${
            mobileMenuOpen ? 'max-h-[500px] ' : 'max-h-0 '
          }`}
        >
          <div
            className={
              'flex flex-col items-center gap-2 px-4 py-4 rounded-b-2xl'
            }
          >
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/rules">Rules</MobileNavLink>
            <MobileNavLink href="/repo">Repositories</MobileNavLink>
            <MobileNavLink href="/bot-commands">Bot Commands</MobileNavLink>
            <MobileNavLink href="/request-for-code">
              Request for Code
            </MobileNavLink>
            <MobileNavLink href="/resources">Resources</MobileNavLink>
            <MobileNavLink href="/team">Team</MobileNavLink>
            <MobileNavLink href="/past-editions">Past Editions</MobileNavLink>

            {/* Mobile Profile + Logout */}
            {user && (
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push(`/profile/${github_username}`)}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-gray-200 shadow"
                >
                  <img
                    src={`https://github.com/${user.github_username}.png`}
                    alt={user.github_username}
                    className="h-7 w-7 rounded-full border"
                  />
                  <span>{user.github_username}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center rounded-full bg-red-200 p-3"
                >
                  <LogOut className="h-4 w-4 text-red-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

// Reusable NavLink component
const NavLink = ({
  href,
  children,
  textClass,
}: {
  href: string;
  children: React.ReactNode;
  textClass: string;
}) => (
  <Link
    href={href}
    className={`whitespace-nowrap rounded-lg px-2 py-1 font-medium text-md transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500 ${textClass}`}
  >
    {children}
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="block rounded-md px-3 py-2 font-medium text-base text-gray-200 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500"
  >
    {children}
  </Link>
);

export default Navbar;
