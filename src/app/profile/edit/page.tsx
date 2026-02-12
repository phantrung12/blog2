import { Container } from "@/components/layout/container";
import { ProfileForm } from "@/components/profile/profile-form";
import { author } from "@/lib/mock-data";

export default function EditProfilePage() {
  return (
    <Container as="main" className="py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          Edit Profile
        </h1>
        <p className="mt-2 text-muted-foreground">
          Update your profile information
        </p>
      </div>

      <ProfileForm author={author} />
    </Container>
  );
}
