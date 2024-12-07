import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { Form, FormField, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Select } from "~/components/ui/select";
import { EDUCATION_LEVELS } from "~/lib/constants/education-levels";
import { PROVINCES } from "~/lib/constants/provinces";

export function ProfileForm() {
  const { data: profile, isLoading } = api.user.getProfile.useQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile || {});

  const { mutate: updateProfile } = api.user.update.useMutation({
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="mt-1 text-sm text-gray-900">
              {profile?.firstName} {profile?.lastName} {profile?.surname}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-sm text-gray-900">{profile?.email}</p>
          </div>
          {/* Add other profile fields */}
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField>
          <FormLabel>First Name</FormLabel>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </FormField>
        {/* Add other form fields */}
      </div>
      <div className="flex space-x-4">
        <Button type="submit">Save Changes</Button>
        <Button type="button" onClick={() => setIsEditing(false)} variant="outline">
          Cancel
        </Button>
      </div>
    </Form>
  );
}