import UserForm from "@/features/user/UserForm";
import useGetUserById from "./useGetUserById";
import { useParams } from "react-router-dom";

function UserEdit() {
  const { id } = useParams();
  const { user, isLoading } = useGetUserById(id);

  if (isLoading) return <p className="text-gray-200">Loading...</p>;

  return <UserForm user={user} />;
}

export default UserEdit;
