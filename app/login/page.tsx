'use client';

import Navbar from '@/app/components/Navbar';
import Cloud from '@/app/components/dashboard-components/Cloud';
import SunGlareEffect from '@/app/components/dashboard-components/SunGlareEffect';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { toast } from '@/app/components/ui/use-toast';
import { make_api_call } from '@/app/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';

// Simplified Schema: Only Email and Password
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

  const validateField = (name: keyof FormData, value: string) => {
    const fieldSchema = formSchema.shape[name];
    const result = fieldSchema.safeParse(value);
    if (result.success) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: result.error.errors[0]?.message,
      }));
    }
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
    setErrors({});
    setIsSubmitting(true);

    try {
      const validatedData = formSchema.parse(formData);

      const result = await make_api_call<{ access_token: string }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        method: 'POST',
        body: validatedData,
      });

      if (!result.success) {
        throw new Error(result.error || 'Login failed');
      }

      toast({
        title: 'Success',
        description: 'Logged in successfully!',
      });

      router.push('/');
      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        for (const err of error.errors) {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        }
        setErrors(newErrors);
      } else {
        toast({
          title: 'Error',
          description:
            error instanceof Error ? error.message : 'Invalid credentials',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container mx-auto min-h-screen flex justify-center items-start md:items-center pt-[100px] md:pb-6 px-4 box-border">
        <div className="max-w-xl w-full">
          {' '}
          {/* Reduced max-width for login */}
          <div className="flex flex-col rounded-2xl md:rounded-3xl border border-white/20 bg-white/40 p-6 md:p-8 shadow-lg backdrop-blur-md">
            <div className="mb-8 flex flex-col items-center justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-2 font-medium">
                Login to continue
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="space-y-6"
            >
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-base font-medium text-gray-800"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@cb.students.amrita.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="h-12 text-base bg-white/20 text-gray-800 border-white/30 placeholder:text-gray-500 rounded-xl transition-all duration-200 hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-base font-medium text-gray-800"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="h-12 text-base bg-white/20 text-gray-800 border-white/30 placeholder:text-gray-500 rounded-xl transition-all duration-200 hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
                />
                {touched.password && errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="group/button relative mt-6 flex w-full cursor-pointer items-center justify-center rounded-3xl bg-blue-500/50 px-4 py-6 text-lg font-medium text-gray-900 shadow-sm transition-all duration-200 hover:bg-blue-500/70 hover:text-gray-800 hover:shadow-md"
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
    </>
  );
}
