import { Link } from "react-router-dom";

import { TableCell, TableRow } from "@/components/ui/table";
import AlertDelete from "@/ui/AlertDelete";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDeleteProduct from "./useDeleteProduct";
import { IoMdAddCircleOutline } from "react-icons/io";

function ProductsItem({ product, productIndex }) {
  const { deleteProduct, isPending, isIdle } = useDeleteProduct();

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <TableRow
      className={`odd:bg-gray-700/50 even:bg-gray-700/70 ${!isIdle && "opacity-50"}`}
    >
      <TableCell>{productIndex}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-x-3">
          <AlertDelete onDelete={() => handleDelete(product.id)}>
            <button
              disabled={isPending}
              className="text-base transition duration-200 ease-in-out hover:text-gray-400"
            >
              <RiDeleteBin5Line />
            </button>
          </AlertDelete>

          <Link
            to={`/products/${product.id}`}
            className="text-base transition duration-200 ease-in-out hover:text-gray-400"
          >
            <MdOutlineEdit />
          </Link>
          <Link
            to={`/product-variants/create/${product.id}`}
            className="text-base transition duration-200 ease-in-out hover:text-gray-400"
          >
            <IoMdAddCircleOutline />
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductsItem;
