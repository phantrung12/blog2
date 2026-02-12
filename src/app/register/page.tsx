import Link from "next/link";
import { Container } from "@/components/layout/container";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <Container
      as="main"
      className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12"
    >
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="font-serif text-3xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-muted-foreground">
            Sign up to start writing and sharing
          </p>
        </div>

        {/* Form */}
        <RegisterForm />

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground transition-colors hover:text-emerald-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Container>
  );
}
