import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfileFormPage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  console.log(currentUser);
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile. Please try again later.</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfileFormPage;
