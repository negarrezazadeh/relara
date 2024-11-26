import UsersList from "@/features/user/UsersList";
import DashboardTitle from "@/ui/DashboarTitle";

function Users() {
  return (
    <div>
      <DashboardTitle>Users</DashboardTitle>
      <UsersList />
    </div>
  );
}

export default Users;
