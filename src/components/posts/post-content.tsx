import { cn } from "@/lib/utils";

interface PostContentProps {
  content: string;
  className?: string;
}

export function PostContent({ content, className }: PostContentProps) {
  return (
    <div
      className={cn(
        // Base typography
        "prose prose-zinc dark:prose-invert max-w-none",
        // Headings
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4",
        "prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3",
        "prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2",
        // Paragraphs
        "prose-p:leading-7 prose-p:my-4",
        // Links
        "prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline",
        "dark:prose-a:text-emerald-500",
        // Lists
        "prose-li:my-1",
        // Code
        "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-code:font-normal prose-code:text-sm",
        // Pre/Code blocks
        "prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-border/40",
        "dark:prose-pre:bg-zinc-950",
        // Blockquotes
        "prose-blockquote:border-l-emerald-600 prose-blockquote:not-italic",
        "dark:prose-blockquote:border-l-emerald-500",
        // Strong
        "prose-strong:font-semibold",
        className,
      )}
    >
      {/* Simple markdown-like rendering for demo */}
      {content.split("\n").map((line, index) => {
        // Handle code blocks (simple version)
        if (line.startsWith("```")) {
          return null;
        }

        // Handle headers
        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl font-semibold mt-6 mb-2">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-semibold mt-8 mb-3">
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="text-3xl font-semibold mt-8 mb-4">
              {line.replace("# ", "")}
            </h1>
          );
        }

        // Handle list items
        if (line.startsWith("- ")) {
          return (
            <li key={index} className="ml-4">
              {formatInlineCode(line.replace("- ", ""))}
            </li>
          );
        }
        if (/^\d+\.\s/.test(line)) {
          return (
            <li key={index} className="ml-4 list-decimal">
              {formatInlineCode(line.replace(/^\d+\.\s/, ""))}
            </li>
          );
        }

        // Handle empty lines
        if (line.trim() === "") {
          return <br key={index} />;
        }

        // Regular paragraphs
        return (
          <p key={index} className="leading-7 my-2">
            {formatInlineCode(line)}
          </p>
        );
      })}
    </div>
  );
}

// Helper function to format inline code
function formatInlineCode(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    // Handle bold text
    const boldParts = part.split(/(\*\*[^*]+\*\*)/);
    return boldParts.map((boldPart, j) => {
      if (boldPart.startsWith("**") && boldPart.endsWith("**")) {
        return (
          <strong key={`${i}-${j}`} className="font-semibold">
            {boldPart.slice(2, -2)}
          </strong>
        );
      }
      return boldPart;
    });
  });
}
