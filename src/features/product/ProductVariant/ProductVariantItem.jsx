import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import AlertDelete from "@/ui/AlertDelete";
import useDeleteProductVariant from "./useDeleteProductVariant";

function ProductVariantItem({ variant, index, uniqueAttributes }) {
  const { deleteProductVariant, isPending } = useDeleteProductVariant();

  const handleDelete = (id) => {
    deleteProductVariant(id);
  };

  return (
    <TableRow
      key={variant.id}
      className="odd:bg-gray-700/50 even:bg-gray-700/70"
    >
      <TableCell>{index + 1}</TableCell>
      {uniqueAttributes.map((attribute) => {
        const attributeValue = variant.attribute_values.find(
          (attr) => attr.attribute_name === attribute,
        );
        return (
          <TableCell key={attribute}>
            {attributeValue ? attributeValue.value : "-"}
          </TableCell>
        );
      })}
      <TableCell>{variant.price}</TableCell>
      <TableCell>{variant.stock}</TableCell>
      <TableCell>{variant.status}</TableCell>
      <TableCell className="text-right">
        {/* Actions */}
        <div className="flex items-center justify-end gap-x-3">
          <AlertDelete onDelete={() => handleDelete(variant.id)}>
            <button
              disabled={isPending}
              className="text-base transition duration-200 ease-in-out hover:text-gray-400"
            >
              <RiDeleteBin5Line />
            </button>
          </AlertDelete>

          <Link
            to={`/product-variants/edit/${variant.id}`}
            className="text-base transition duration-200 ease-in-out hover:text-gray-400"
          >
            <MdOutlineEdit />
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductVariantItem;
