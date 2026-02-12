export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  email: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export const author: Author = {
  name: "Alex Chen",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  bio: "Software engineer and writer. I love building things and sharing what I learn. Currently exploring the intersection of technology and creativity.",
  email: "alex@example.com",
  social: {
    twitter: "alexchen",
    github: "alexchen",
    linkedin: "alexchen",
  },
};

export const posts: Post[] = [
  {
    id: "1",
    slug: "building-modern-web-apps",
    title: "Building Modern Web Applications with Next.js 15",
    excerpt:
      "Explore the latest features in Next.js 15 and learn how to build performant, scalable web applications with the new App Router and Server Components.",
    content: `# Building Modern Web Applications with Next.js 15

Next.js 15 brings exciting new features that make building web applications more intuitive and performant than ever before.

## The App Router Revolution

The App Router represents a fundamental shift in how we think about routing in Next.js applications. With nested layouts, parallel routes, and intercepting routes, you can create complex navigation patterns with ease.

### Key Features

1. **Server Components by Default** - Components are rendered on the server, reducing JavaScript sent to the client.
2. **Streaming** - Progressive rendering allows content to be displayed as it becomes available.
3. **Nested Layouts** - Share UI between routes while maintaining state.

## Getting Started

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --app
\`\`\`

## Conclusion

Next.js 15 is a game-changer for React developers.`,
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop",
    publishedAt: "2024-12-15T10:00:00Z",
    tags: ["Next.js", "React", "Web Development"],
    readingTime: 5,
  },
  {
    id: "2",
    slug: "mastering-typescript",
    title: "Mastering TypeScript: Advanced Patterns",
    excerpt:
      "Deep dive into advanced TypeScript patterns including generics, conditional types, and mapped types that will level up your code.",
    content: `# Mastering TypeScript: Advanced Patterns

TypeScript offers powerful features that go beyond basic type annotations.

## Generics

Generics allow you to write flexible, reusable components:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## Conclusion

Mastering these advanced patterns will help you write more type-safe code.`,
    publishedAt: "2024-12-10T08:30:00Z",
    tags: ["TypeScript", "JavaScript", "Programming"],
    readingTime: 8,
  },
  {
    id: "3",
    slug: "design-systems-at-scale",
    title: "Building Design Systems at Scale",
    excerpt:
      "Learn how to create and maintain design systems that scale across large organizations and multiple products.",
    content: `# Building Design Systems at Scale

A design system is more than a component library—it's a shared language that unites design and development teams.

## Why Design Systems?

- **Consistency** - Ensure a unified look and feel
- **Efficiency** - Reduce duplicate work
- **Quality** - Improve accessibility and usability

## Conclusion

A well-built design system is an investment that pays dividends.`,
    coverImage:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=630&fit=crop",
    publishedAt: "2024-12-05T14:00:00Z",
    tags: ["Design", "UI/UX", "Systems"],
    readingTime: 6,
  },
  {
    id: "4",
    slug: "productivity-for-developers",
    title: "Productivity Tips for Developers",
    excerpt:
      "Practical strategies to boost your productivity as a software developer, from time management to tooling.",
    content: `# Productivity Tips for Developers

Being productive isn't about working more hours—it's about working smarter.

## Time Management

### The Pomodoro Technique

Work in focused 25-minute intervals:

1. Choose a task
2. Set a 25-minute timer
3. Work until the timer rings
4. Take a 5-minute break

## Conclusion

Sustainable productivity comes from good habits.`,
    publishedAt: "2024-11-28T09:00:00Z",
    tags: ["Productivity", "Career", "Tips"],
    readingTime: 4,
  },
  {
    id: "5",
    slug: "introduction-to-system-design",
    title: "Introduction to System Design",
    excerpt:
      "A beginner-friendly introduction to system design concepts, from load balancing to database sharding.",
    content: `# Introduction to System Design

System design is the process of defining the architecture of a system.

## Key Concepts

### Scalability

- **Vertical scaling** - Add more power to existing machines
- **Horizontal scaling** - Add more machines

### Load Balancing

Distribute traffic across multiple servers.

## Conclusion

System design is both an art and a science.`,
    coverImage:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=630&fit=crop",
    publishedAt: "2024-11-20T11:00:00Z",
    tags: ["System Design", "Architecture", "Backend"],
    readingTime: 7,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
}
