"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserById } from "@/hooks/use-users";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function ProfileInfo() {
  const router = useRouter();
  const [user, setUser] = useState<{ id?: string }>({});

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const { data: userDetail } = useUserById(user.id!);
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="size-24">
        <AvatarImage
          src={userDetail?.data?.data?.avatarUrl}
          className="object-cover"
        />
        <AvatarFallback>
          {userDetail?.data?.data?.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-2xl font-bold">{userDetail?.data?.data?.name}</h1>
        <h1 className="text-sm font-bold">
          {userDetail?.data?.data?.jobTitle}
        </h1>
        <p className="text-muted-foreground">{userDetail?.data?.data?.email}</p>
      </div>
      <Button
        size={"sm"}
        className="cursor-pointer bg-primary text-primary-foreground"
        onClick={() => router.push("/profile/edit")}
      >
        <Edit2 className="size-4" />
        Edit Profile
      </Button>
    </div>
  );
}
