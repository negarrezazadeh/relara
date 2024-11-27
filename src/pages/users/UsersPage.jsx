import UsersList from "@/features/user/UsersList";
import DashboardTitle from "@/ui/DashboardTitle";

function UsersPage() {
  return (
    <div>
      <DashboardTitle>Users</DashboardTitle>
      <UsersList />
    </div>
  );
}

export default UsersPage;
