import Link from "next/link";
import { Container } from "@/components/layout/container";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <Container
      as="main"
      className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12"
    >
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="font-serif text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground transition-colors hover:text-emerald-600"
          >
            Sign up
          </Link>
        </p>
      </div>
    </Container>
  );
}
