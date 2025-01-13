import { TableCell, TableRow } from "@/components/ui/table";
import AlertDelete from "@/ui/AlertDelete";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useDeleteDiscountCode from "./useDeleteDiscountCode";

function DiscountCodeItem({ discountCode, discountCodeIndex }) {
  const { deleteDiscountCode, isPending, isIdle } = useDeleteDiscountCode();

  const handleDelete = (id) => {
    deleteDiscountCode(id);
  };

  return (
    <TableRow
      className={`odd:bg-gray-700/50 even:bg-gray-700/70 ${!isIdle && "opacity-50"}`}
    >
      <TableCell>{discountCodeIndex}</TableCell>
      <TableCell className="text-violet-400">{discountCode.code}</TableCell>
      <TableCell>{discountCode.type}</TableCell>
      <TableCell>{discountCode.value}</TableCell>
      <TableCell>{discountCode.usage_limit}</TableCell>
      <TableCell>{discountCode.expires_at}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-x-3">
          <AlertDelete onDelete={() => handleDelete(discountCode.id)}>
            <button
              disabled={isPending}
              className="text-base transition duration-200 ease-in-out hover:text-gray-400"
            >
              <RiDeleteBin5Line />
            </button>
          </AlertDelete>
          <Link
            to={`/discount-codes/${discountCode.id}`}
            className="text-base transition duration-200 ease-in-out hover:text-gray-400"
          >
            <MdOutlineEdit />
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default DiscountCodeItem;
