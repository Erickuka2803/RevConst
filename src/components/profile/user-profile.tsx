import { api } from "~/utils/api";

export function UserProfile() {
  const { data: profile, isLoading } = api.user.getProfile.useQuery();

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Name</h3>
          <p className="mt-1 text-sm text-gray-900">
            {profile.firstName} {profile.lastName} {profile.surname}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Profession</h3>
          <p className="mt-1 text-sm text-gray-900">{profile.profession}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Education</h3>
          <p className="mt-1 text-sm text-gray-900">{profile.education}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Location</h3>
          <p className="mt-1 text-sm text-gray-900">
            {profile.village && `${profile.village}, `}
            {profile.town}, {profile.territory}, {profile.province}, {profile.country}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Region</h3>
          <p className="mt-1 text-sm text-gray-900">{profile.region}</p>
        </div>
      </div>
    </div>
  );
}