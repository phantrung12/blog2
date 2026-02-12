"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenSquare, User, LogOut } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

const navigation = [{ name: "Blog", href: "/" }];

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <Container className="max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight transition-colors hover:text-foreground/80"
          >
            blog<span className="text-emerald-600">.</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    {/* Profile */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      asChild
                    >
                      <Link
                        href="/profile/edit"
                        title={user?.name || "Profile"}
                      >
                        <User className="h-4 w-4" />
                        <span className="sr-only">Profile</span>
                      </Link>
                    </Button>

                    {/* Write button - desktop */}
                    <Button size="sm" className="hidden sm:flex" asChild>
                      <Link href="/posts/new">
                        <PenSquare className="mr-2 h-4 w-4" />
                        Write
                      </Link>
                    </Button>

                    {/* Write button - mobile */}
                    <Button size="icon" className="h-9 w-9 sm:hidden" asChild>
                      <Link href="/posts/new">
                        <PenSquare className="h-4 w-4" />
                        <span className="sr-only">Write</span>
                      </Link>
                    </Button>

                    {/* Logout */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-foreground"
                      onClick={logout}
                      title="Sign out"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="sr-only">Sign out</span>
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/login">Sign in</Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
