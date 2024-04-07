import { useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfileFormPage = () => {
  const { updateUser, isLoading } = useUpdateMyUser();
  return <UserProfileForm onSave={updateUser} isLoading={isLoading} />;
};

export default UserProfileFormPage;
