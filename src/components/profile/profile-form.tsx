"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { type Author } from "@/lib/mock-data";

interface ProfileFormProps {
  author: Author;
}

export function ProfileForm({ author }: ProfileFormProps) {
  const router = useRouter();
  const [name, setName] = React.useState(author.name);
  const [email, setEmail] = React.useState(author.email);
  const [bio, setBio] = React.useState(author.bio);
  const [avatar, setAvatar] = React.useState(author.avatar);
  const [twitter, setTwitter] = React.useState(author.social?.twitter ?? "");
  const [github, setGithub] = React.useState(author.social?.github ?? "");
  const [linkedin, setLinkedin] = React.useState(author.social?.linkedin ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log({
      name,
      email,
      bio,
      avatar,
      social: { twitter, github, linkedin },
    });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button type="submit" className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <Avatar className="h-24 w-24 border-2 border-border">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="text-2xl">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input
            id="avatar"
            type="url"
            placeholder="https://example.com/avatar.jpg"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Enter a URL to your profile picture
          </p>
        </div>
      </div>

      <Separator />

      {/* Basic Info */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Basic Information</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell people a little about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            {bio.length}/300 characters
          </p>
        </div>
      </div>

      <Separator />

      {/* Social Links */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Social Links</h2>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">@</span>
              <Input
                id="twitter"
                placeholder="username"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">@</span>
              <Input
                id="github"
                placeholder="username"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">in/</span>
              <Input
                id="linkedin"
                placeholder="username"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
