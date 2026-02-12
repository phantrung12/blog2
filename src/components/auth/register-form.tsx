"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, AlertCircle, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth-context";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { control, handleSubmit } = useForm<RegisterFormData>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Register
      await authService.register(data);

      // Auto-login after registration
      const loginResponse = await authService.login({
        email: data.email,
        password: data.password,
      });

      if (loginResponse?.data?.success) {
        const { accessToken, user } = loginResponse.data.data;
        login(accessToken, user);
        router.push("/");
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(
          axiosErr.response?.data?.message ||
            "Registration failed. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...field}
                id="name"
                type="text"
                placeholder="Your name"
                required
                className="pl-10"
              />
            </div>
          )}
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="pl-10"
              />
            </div>
          )}
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="pl-10"
              />
            </div>
          )}
        />
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
        {isLoading ? (
          "Creating account..."
        ) : (
          <>
            Sign up
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
