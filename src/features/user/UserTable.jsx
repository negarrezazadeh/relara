import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

function UserTable({ user, userIndex }) {
  return (
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
        <TableRow>
          <TableCell className="text-gray-200">{userIndex}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-end gap-x-3">
              <button className="text-base hover:text-gray-400 transition ease-in-out duration-200">
                <RiDeleteBin5Line />
              </button>
              <button className="text-base hover:text-gray-400 transition ease-in-out duration-200">
                <MdOutlineEdit />
              </button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default UserTable;
