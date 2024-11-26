import Card from "@/ui/Card";
import useUsers from "./useUsers";
import UserTable from "./UserTable";


function UsersList() {
  const { isLoading, users } = useUsers();

  if (isLoading) return <p className="text-gray-200">Loading...</p>;

  return (
    <Card>
        {users.data.map((user,index) => (
          <UserTable key={user.id} user={user} userIndex={index}/>
        ))}
    </Card>
  );
}

export default UsersList;
