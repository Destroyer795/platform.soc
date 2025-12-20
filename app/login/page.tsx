'use client';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { toast } from '@/app/components/ui/use-toast';
import { make_api_call } from '@/app/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';
import { useAuthStore } from '../store/useAuthStore';

// Password hashing utility
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  // useAuthStore
  const { setUser } = useAuthStore();

  const validateField = (name: keyof FormData, value: string) => {
    const fieldSchema = formSchema.shape[name];
    const result = fieldSchema.safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.errors[0]?.message,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = formSchema.parse(formData);
      const hashedPassword = await hashPassword(validatedData.password);

      const result = await make_api_call<{
        accessToken: string;
        refreshToken: string;
        message: string;
      }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        method: 'POST',
        body: { email: validatedData.email, password: hashedPassword },
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Login failed');
      }

      console.log('Login successful:', result.data);

      setUser({
        access_token: result.data.accessToken,
        refresh_token: result.data.refreshToken,
        github_username: '',
        email: validatedData.email,
        bounty: 0,
      });

      toast({ title: 'Success', description: 'Logged in successfully!' });
      router.push('/');
      router.refresh();
    } catch (error) {
      // ... error handling
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center px-4">
      <div className="max-w-md w-full">
        <div className="flex flex-col rounded-3xl border border-white/20 bg-white/40 p-8 shadow-lg backdrop-blur-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Login to continue</p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="bg-white/20"
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="bg-white/20"
              />
              {touched.password && errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 py-6 text-lg rounded-3xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
