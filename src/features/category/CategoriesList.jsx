import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "@/ui/Loader";
import Card from "@/ui/Card";
import AlertDelete from "@/ui/AlertDelete";
import useCategories from "./useCategories";
import useDeleteCategory from "./useDeleteCategory";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { IoMdAddCircleOutline } from "react-icons/io";

function UlListCat({ categories }) {
  const { deleteCategory, isPending } = useDeleteCategory();

  const handleDelete = (category) => {
    if (category.children.length > 0) {
      toast.error("You cannot delete a category with subcategories");
      return;
    }
    deleteCategory(category.id);
  };

  return (
    <ul className="space-y-2 border-l border-gray-600 pl-4">
      {categories.map((category) => (
        <li key={category.id}>
          <div
            className={`group mt-1 flex items-center justify-between gap-x-3 rounded-lg px-2 py-2 transition ${
              category.children.length > 0
                ? "bg-gray-300 text-gray-800"
                : "bg-gray-700 text-gray-200"
            } `}
          >
            {/* category name */}
            <div className="flex items-center gap-x-2">
              <span className="text-sm font-medium">{category.name}</span>
              {category.children.length > 0 && (
                <span className="text-xs font-semibold">(Parent)</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* add button */}
              <Link
                to={`/categories/create?category=${category.id}`}
                className="rounded p-1 text-sm transition hover:text-violet-500"
              >
                <IoMdAddCircleOutline />
              </Link>
              {/* delete button */}
              <AlertDelete
                onDelete={() => handleDelete(category)}
                disabled={category.children.length > 0}
              >
                <button
                  disabled={isPending || category.children.length > 0}
                  className={`rounded p-1 text-sm transition ${
                    category.children.length > 0
                      ? "opacity-50"
                      : "hover:text-red-600"
                  }`}
                >
                  <RiDeleteBin5Line />
                </button>
              </AlertDelete>
              {/* edit button */}
              <Link
                to={`/categories/${category.id}`}
                className="rounded p-1 text-sm transition hover:text-violet-500"
              >
                <MdOutlineEdit />
              </Link>
            </div>
          </div>
          {/* subcategories */}
          {category.children.length > 0 && (
            <UlListCat categories={category.children} />
          )}
        </li>
      ))}
    </ul>
  );
}

function CategoriesList() {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <Loader />;

  return (
    <Card>
      {categories.length > 0 ? (
        <UlListCat categories={categories} />
      ) : (
        <div className="my-2 flex flex-col items-center">
          <p className="text-center font-semibold text-violet-400">
            No categories found. Do you want to add one?
          </p>
          <Link to={`/categories/create`}>
            <Button className="mx-auto mt-5 bg-gray-200 text-black hover:bg-gray-700 hover:text-white">
              Add Category
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}

export default CategoriesList;
