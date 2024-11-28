import UserForm from "@/features/user/UserForm";
import useGetUserById from "./useGetUserById";
import { useParams } from "react-router-dom";
import Loader from "@/ui/Loader";


function UserEdit() {
  const { id } = useParams();
  const { user, isLoading } = useGetUserById(id);

  if (isLoading) return <Loader/>;

  return <UserForm user={user} />;
}

export default UserEdit;
