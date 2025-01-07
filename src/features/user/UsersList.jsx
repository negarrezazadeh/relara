import { useState } from "react";
import useUsers from "./useUsers";
import UserItem from "./UserItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Card from "@/ui/Card";
import Loader from "@/ui/Loader";
import PageController from "@/ui/PageController";

function UsersList() {
  const [page, setPage] = useState(1);

  const { isLoading, users, currentPage, lastPage, isPlaceholderData } =
    useUsers(page);

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
          {users.users.map((user, index) => (
            <UserItem
              key={user.id}
              user={user}
              userIndex={(currentPage - 1) * 2 + index + 1}
            />
          ))}
        </TableBody>
      </Table>

      {/* pagination */}
      <PageController isPlaceholderData={isPlaceholderData} currentPage={page} lastPage={lastPage} onPageChange={setPage}/>

    </Card>
  );
}

export default UsersList;
