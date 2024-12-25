import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import { TableCell, TableRow } from "@/components/ui/table";
import AlertDelete from "@/ui/AlertDelete";
import { TooltipWrapper } from "@/ui/TooltipWrapper";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiMessageSquareDetail } from "react-icons/bi";
import useDeleteProduct from "./useDeleteProduct";

function ProductsItem({ product, productIndex }) {
  const { deleteProduct, isPending, isIdle } = useDeleteProduct();  

  const handleDelete = (id) => {
    if(product.variants.length > 0) return toast.error("Product has variants. You cannot delete this product")
    deleteProduct(id);
  };  

  return (
    <TableRow
      className={`odd:bg-gray-700/50 even:bg-gray-700/70 ${!isIdle && "opacity-50"}`}
    >
      <TableCell>{productIndex}</TableCell>
      <TableCell>{product.primary_image && <img src={product.primary_image.url} alt={product.name} className="w-10 h-10 object-cover rounded"/>}</TableCell>
      <TableCell className="text-violet-400"><Link to={`/product-variants/create/${product.id}`}>{product.name}</Link></TableCell>
      <TableCell>{product.variants.length}</TableCell>
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

          <TooltipWrapper tooltipText={"Edit Product"}>
            <Link
              to={`/products/${product.id}`}
              className="text-base transition duration-200 ease-in-out hover:text-gray-400"
            >
              <MdOutlineEdit />
            </Link>
          </TooltipWrapper>

          <TooltipWrapper tooltipText={"Add Variant"}>
            <Link
              to={`/product-variants/create/${product.id}`}
              className="text-base transition duration-200 ease-in-out hover:text-gray-400"
            >
              <IoMdAddCircleOutline />
            </Link>
          </TooltipWrapper>

          <TooltipWrapper tooltipText="Show Variants">
            <Link
              to={`/product-variants/${product.id}`}
              className="text-base transition duration-200 ease-in-out hover:text-gray-400"
            >
              <BiMessageSquareDetail />
            </Link>
          </TooltipWrapper>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductsItem;
