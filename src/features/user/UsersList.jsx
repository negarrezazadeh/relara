import Card from "@/ui/Card";
import useUsers from "./useUsers";
import UserItem from "./UserItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/ui/Loader";

function UsersList() {
  const { isLoading, users } = useUsers();

  if (isLoading) return <Loader />;

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data.map((user, index) => (
            <UserItem key={user.id} user={user} userIndex={index + 1} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default UsersList;
