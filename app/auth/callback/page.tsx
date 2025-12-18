'use client';

import { toast } from '@/app/components/ui/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

export default function AuthCallback() {
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
      toast({
        title: 'Error',
        description: 'GitHub linking failed or account already linked.',
        variant: 'destructive',
      });
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

      toast({
        title: 'Success',
        description: 'GitHub account linked successfully!',
      });
      router.push('/');
    } else {
      router.push('/');
    }
  }, [searchParams, setUser, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p>Finishing setup...</p>
      </div>
    </div>
  );
}
