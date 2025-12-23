'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Suspense } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/useAuthStore';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const githubUsername = searchParams.get('github_username');
    const email = searchParams.get('email');
    const bountyStr = searchParams.get('bounty');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Authentication Error');
      router.push('/');
      return;
    }

    if (accessToken && refreshToken && githubUsername && email) {
      // update the auth store with the new data
      setUser({
        access_token: accessToken,
        refresh_token: refreshToken,
        github_username: githubUsername,
        email: email,
        bounty: bountyStr ? Number.parseInt(bountyStr) : 0,
      });

      toast.success('GitHub account linked successfully!');
      router.push('/');
    } else {
      router.push('/');
    }
  }, [searchParams, setUser, router]);
  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-transparent text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p>Establishing connection with GitHub...</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-transparent text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            <p>Establishing connection with GitHub...</p>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
