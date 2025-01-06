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
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`text-sm font-medium ${currentPage === 1 ? "text-gray-500" : "text-violet-500"}`}
        >
          Previous
        </button>
        <span className="mx-4 text-gray-600">|</span>
        <span className="text-sm font-medium text-gray-300">
          Page {currentPage} of {lastPage}
        </span>
        <span className="mx-4 text-gray-600">|</span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage || isPlaceholderData}
          className={`text-sm font-medium ${currentPage === lastPage || isPlaceholderData ? "text-gray-500" : "text-violet-500"}`}
        >
          Next
        </button>
      </div>
    </Card>
  );
}

export default UsersList;
