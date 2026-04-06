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
import JSCookie from "js-cookie";
import { useUserById, useUsers } from "@/hooks/use-users";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ProfileFormProps {
  author: Author;
}

const profileSchema = yup.object({
  avatarUrl: yup.string().url("Invalid URL").optional(),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  bio: yup.string().optional(),
  websiteUrl: yup.string().url("Invalid URL").optional(),
  jobTitle: yup.string().optional(),
});

export function ProfileForm({ author }: ProfileFormProps) {
  const router = useRouter();
  const profileForm = useForm<any>({
    resolver: yupResolver(profileSchema),
  });
  const { control, handleSubmit } = profileForm;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data: userDetail } = useUserById(user.id);
  const { updateUser } = useUsers();

  React.useEffect(() => {
    if (userDetail) {
      profileForm.reset({
        avatarUrl: userDetail.data?.data?.avatarUrl,
        name: userDetail.data?.data?.name,
        email: userDetail.data?.data?.email,
        bio: userDetail.data?.data?.bio,
      });
    }
  }, [userDetail]);

  const onSubmit = async (data: any) => {
    console.log(data);
    // call api update user
    const res = await updateUser.mutateAsync({
      id: user.id,
      data,
    });
    if (res.status === 200) {
      // toast.success("Profile updated successfully");
    }
  };

  return (
    <Form {...profileForm}>
      <div className="space-y-8">
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

          <Button
            type="submit"
            className="gap-2"
            onClick={handleSubmit(onSubmit)}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar className="h-24 w-24 border-2 border-border">
            <AvatarImage
              src={userDetail?.data?.data?.avatarUrl}
              alt={userDetail?.data?.data?.name}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl">
              {userDetail?.data?.data?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <FormField
              control={control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>Avatar URL</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      {...field}
                      placeholder="Nhập tiêu đề bài thi"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* Basic Info */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Basic Information</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} placeholder="Nhập tên" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      {...field}
                      placeholder="Nhập email"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      id="websiteUrl"
                      {...field}
                      placeholder="Nhập website"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      id="jobTitle"
                      {...field}
                      placeholder="Nhập chức vụ"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={control}
              name="bio"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>Bio</FormLabel>
                  <FormControl>
                    <Textarea id="bio" {...field} placeholder="Nhập bio" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}
