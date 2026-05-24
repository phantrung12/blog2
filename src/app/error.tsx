"use client"; // BẮT BUỘC phải là Client Component

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4">
      {/* Animated background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[500px] w-[500px] rounded-full bg-destructive/5 blur-[120px] dark:bg-destructive/10" />
      </div>

      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        {/* Animated error icon */}
        <div className="relative mb-8">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-destructive/20 bg-destructive/5 dark:bg-destructive/10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 dark:bg-destructive/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-destructive animate-pulse"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>

          {/* Decorative floating particles */}
          <div className="absolute -right-2 -top-2 h-3 w-3 animate-bounce rounded-full bg-destructive/30" style={{ animationDelay: "0s", animationDuration: "3s" }} />
          <div className="absolute -left-3 top-6 h-2 w-2 animate-bounce rounded-full bg-destructive/20" style={{ animationDelay: "1s", animationDuration: "2.5s" }} />
          <div className="absolute -bottom-1 right-4 h-2.5 w-2.5 animate-bounce rounded-full bg-destructive/25" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }} />
        </div>

        {/* Error code badge */}
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/5 px-3 py-1 text-xs font-medium text-destructive dark:bg-destructive/10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
          </span>
          Lỗi hệ thống
        </div>

        {/* Heading */}
        <h1 className="mb-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Có lỗi xảy ra
        </h1>

        {/* Description */}
        <p className="mb-2 text-base leading-relaxed text-muted-foreground">
          Rất tiếc, đã xảy ra sự cố không mong muốn. Hệ thống không thể xử lý yêu cầu của bạn.
        </p>

        {/* Error message (if available) */}
        {error?.message && (
          <div className="mb-6 w-full rounded-lg border border-border bg-muted/50 p-3">
            <p className="font-mono text-xs text-muted-foreground break-all">
              {error.message}
            </p>
          </div>
        )}

        {!error?.message && <div className="mb-6" />}

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={() => reset()}
            size="lg"
            className="group relative overflow-hidden bg-destructive text-white hover:bg-destructive/90"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`mr-1 h-4 w-4 transition-transform duration-500 ${isHovered ? "rotate-[360deg]" : ""}`}
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            Thử lại
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = "/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1 h-4 w-4"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Về trang chủ
          </Button>
        </div>

        {/* Error digest for debugging */}
        {error?.digest && (
          <p className="mt-6 text-[11px] text-muted-foreground/60">
            Mã lỗi: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">{error.digest}</code>
          </p>
        )}
      </div>
    </div>
  );
}
