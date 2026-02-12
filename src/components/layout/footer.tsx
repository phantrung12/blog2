import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Container } from "@/components/layout/container";

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} blog. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon className="h-4 w-4" />
                <span className="sr-only">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
