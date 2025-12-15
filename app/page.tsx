// src/app/page.tsx
'use client';
import HallOfFame from './components/dashboard-components/hallOfFame';
import Leaderboard from './components/dashboard-components/leaderboard';
import './globals.css';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import { ArrowRight, Github } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Cloud from './components/dashboard-components/Cloud';
import Logtable from './components/dashboard-components/Logtable';
import SunGlareEffect from './components/dashboard-components/SunGlareEffect';
import { useTheme } from './components/theme-context';
import { handleSignIn } from './lib/utils';
import { useAuthStore } from './store/useAuthStore';

const Dashboard = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data.type === 'AUTH_SUCCESS'
      ) {
        window.location.reload();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const theme = process.env.NEXT_PUBLIC_THEME;
  const { classes } = useTheme();

  return (
    <div className="relative flex w-full flex-col text-white">
      {/* ✅ Desktop Background */}
      {/* <Image
        src="/winter_bg1.png"
        alt="Winter Desktop Background"
        fill
        priority
        className="fixed inset-0 -z-10 hidden md:block object-cover"
      /> */}

      {/* ✅ Mobile & Tablet Background */}
      {/* <Image
        src="/winter_bg_mobile.png"
        alt="Winter Mobile Background"
        fill
        priority
        className="fixed inset-0 -z-10 block md:hidden object-cover"
      /> */}

      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-[40%_minmax(0,1fr)] gap-8 items-start py-12 md:py-0 flex-grow">
        <div className="z-10 flex flex-col items-center md:items-start justify-center text-left py-0 md:py-12 md:h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center md:items-start gap-2 mb-6">
            <p className="text-xs sm:text-sm text-white font-medium">
              Brought to you by
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/amrita-reverse-logo.svg"
                alt="Amrita Logo"
                width={100}
                height={0}
                className="h-auto max-w-[100px] object-contain"
              />
              <Image
                src="/anokha.png"
                alt="Anokha Logo"
                width={100}
                height={0}
                className="h-auto max-w-[100px] object-contain"
              />
              <Image
                src="/acmlogonew.webp"
                alt="ACM Logo"
                width={60}
                height={0}
                className="h-auto max-w-[60px] object-contain"
              />
            </div>
          </div>

          <h1 className="font-extrabold text-5xl tracking-tight sm:text-6xl md:text-5xl text-white">
            Amrita
          </h1>
          <h1 className="mb-4 md:mb-6 font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-blue-400">
            Winter of Code 2.0
          </h1>
          <p className="mb-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-100 text-center md:text-left px-4 md:px-0">
            After a successful Winter of Code last year, the ACM student chapter
            is back with the{' '}
            <strong className="text-blue-400">Winter of Code 2.0</strong>.
            Collaborate, learn, build innovative projects and showcase your
            skills!
          </p>
          <div className="flex flex-row gap-4 sm:flex-row">
            {!user ? (
              <>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="flex cursor-pointer transform items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium sm:px-8 sm:py-3 sm:font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:gap-3"
                >
                  <Github size={22} />
                  Log in with GitHub
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/register')}
                  className="transform cursor-pointer rounded-lg bg-blue-400 px-6 py-2 text-sm font-medium sm:px-8 sm:py-3 sm:font-semibold text-gray-900 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-amber-700"
                >
                  Register Now
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => router.push(`/profile/${user.github_username}`)}
                className="flex cursor-pointer transform items-center justify-between gap-2 rounded-3xl bg-gray-800 px-2 py-2 text-sm font-medium w-fit sm:font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:gap-3"
              >
                <img
                  src={`https://github.com/${user.github_username}.png`}
                  alt={user.github_username}
                  className="h-8 w-8 rounded-full border border-gray-300 shadow-sm"
                />
                <span className="font-semibold text-base">
                  Track My Progress
                </span>
                <ArrowRight size={24} />
              </button>
            )}
          </div>
          <a
            href="https://github.com/Infinite-Sum-Games"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[15px] text-gray-100 opacity-90 transition hover:opacity-100 hover:underline underline-offset-2"
          >
            <span>Powered by</span>
            <Image
              src="/Infinite Sum Games.jpeg.jpg"
              alt="Infinite Sum Games"
              width={18}
              height={18}
              className="rounded-sm object-contain"
            />
            <span className="font-medium">Infinite Sum Games</span>
          </a>
        </div>
        <div className="relative z-10 flex w-full flex-1 flex-col items-center py-8 md:py-4 md:h-[calc(100vh-80px)]">
          <Tabs
            defaultValue="leaderboard"
            className="w-full flex flex-col h-full"
          >
            <TabsList
              className={`grid w-full grid-cols-3 p-1 rounded-3xl backdrop-blur-sm mb-2 shrink-0 ${classes.cardBg}`}
            >
              <TabsTrigger
                value="live-activity"
                className="py-2.5 text-sm font-bold data-[state=inactive]:text-gray-300 data-[state=active]:bg-white  rounded-3xl transition-all cursor-pointer"
              >
                Live Activity
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="py-2.5 text-sm font-bold data-[state=inactive]:text-gray-300 data-[state=active]:bg-white  rounded-3xl transition-all cursor-pointer"
              >
                Leaderboard
              </TabsTrigger>
              <TabsTrigger
                value="hall-of-fame"
                className="py-2.5 text-sm font-bold data-[state=inactive]:text-gray-300 data-[state=active]:bg-white  rounded-3xl transition-all cursor-pointer"
              >
                Hall of Fame
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="live-activity"
              className="flex-grow overflow-y-auto"
            >
              <Logtable />
            </TabsContent>
            <TabsContent
              value="leaderboard"
              className="flex-grow overflow-y-auto"
            >
              <Leaderboard user={user ? user : null} />
            </TabsContent>
            <TabsContent
              value="hall-of-fame"
              className="flex-grow overflow-y-auto"
            >
              <HallOfFame />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* <footer className="w-full text-center py-4 mt-8 text-sm text-gray-950 font-medium ">
        <span className="inline-flex items-center gap-2 justify-center">
          <span className="text-red-400 animate-pulse">❤️</span>
          <span>Powered by</span>
          <a
            href="https://github.com/Infinite-Sum-Games"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-yellow-300 transition"
          >
            <Image
              src="/Infinite Sum Games.jpeg.jpg"
              alt="Infinite Sum Games Logo"
              width={20}
              height={20}
              className="rounded-sm object-contain"
            />
            Infinite Sum Games
          </a>
        </span>
      </footer> */}
    </div>
  );
};

export default Dashboard;
