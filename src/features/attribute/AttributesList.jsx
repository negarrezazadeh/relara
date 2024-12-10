import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import Loader from "@/ui/Loader";
import Card from "@/ui/Card";
import AlertDelete from "@/ui/AlertDelete";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import useAttributes from "./useAttributes";
import useDeleteAttribute from "./useDeleteAttribute";
import useDelete from "./attributeValue/useDeleteAttributeValue";
import { Button } from "@/components/ui/button";

function UlListAttr({ attributes }) {
  const { deleteAttribute, isPending } = useDeleteAttribute();

  const { deleteAttributeValue, isPending: isPendingDelete } = useDelete();

  const handleDelete = (attribute) => {
    if (attribute.values.length > 0) {
      toast.error("You cannot delete a category with subcategories");
      return;
    }
    deleteAttribute(attribute.id);
  };

  const handleDeleteValue = (item) => {
    deleteAttributeValue(item.id);
  };

  return (
    <ul className="space-y-2 border-l border-gray-600 pl-4">
      {/* parent attribute */}
      {attributes.map((attribute) => (
        <li key={attribute.id}>
          <div className="group flex items-center justify-between gap-x-3 rounded-lg bg-gray-300 px-3 py-2 text-gray-800 transition">
            <p className="text-sm font-medium">{attribute.name}</p>

            <div className="flex items-center gap-3">
              {/* delete button */}
              <AlertDelete onDelete={() => handleDelete(attribute)}>
                <button
                  disabled={attribute?.values?.length > 0 || isPending}
                  className={`p-1 text-base transition ${
                    attribute?.values?.length > 0
                      ? "opacity-50"
                      : "text-gray-500 hover:text-red-600"
                  }`}
                >
                  <RiDeleteBin5Line />
                </button>
              </AlertDelete>
              {/* edit button */}
              <Link
                to={`/attributes/${attribute.id}`}
                className="p-1 text-base text-gray-500 transition hover:text-cyan-600"
              >
                <MdOutlineEdit />
              </Link>
              <Link
                to={`/attribute-values/create/${attribute.id}`}
                className="p-1 text-base text-gray-500 transition hover:text-cyan-600"
              >
                <IoMdAddCircleOutline />
              </Link>
            </div>
          </div>

          {/* values */}
          {attribute?.values?.length > 0 && (
            <ul className="mt-1 space-y-2 border-l border-gray-500 pl-4">
              {attribute.values.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-gray-700 px-3 py-2 text-sm text-gray-200"
                >
                  <span>{item.value}</span>
                  <div className="flex items-center gap-3">
                    {/* delete button */}
                    <AlertDelete onDelete={() => handleDeleteValue(item)}>
                      <button
                        className="p-1 text-sm text-gray-500 transition hover:text-red-600"
                        disabled={isPendingDelete}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </AlertDelete>
                    {/* edit button */}
                    <Link
                      to={`/attribute-values/${item.id}`}
                      className="p-1 text-sm text-gray-500 transition hover:text-cyan-600"
                    >
                      <MdOutlineEdit />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function AttributesList() {
  const { attributes, isLoading } = useAttributes();

  if (isLoading) return <Loader />;

  return (
    <Card>
      {attributes.length > 0 ? (
        <UlListAttr attributes={attributes} />
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-center font-semibold text-gray-100">
            No attributes found. Do you want to add one?
          </p>
          <Link to={`/attributes/create`}>
            <Button className="mx-auto mt-4 bg-gray-200 text-black hover:bg-gray-700 hover:text-white">
              Add Product
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}

export default AttributesList;
