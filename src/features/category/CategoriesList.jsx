import Loader from "@/ui/Loader";
import useCategories from "./useCategories";
import Card from "@/ui/Card";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDeleteCategory from "./useDeleteCategory";
import AlertDelete from "@/ui/AlertDelete";
import toast from "react-hot-toast";

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
    <ul className="px-5">
      {categories.map((category) => (
        <li key={category.id}>
          <div className="flex items-center gap-x-3 py-1">
            {category.name}

            <AlertDelete
              onDelete={() => handleDelete(category)}
              disabled={category.children.length > 0}
            >
              <button
                disabled={isPending || category.children.length > 0}
                className={`text-sm transition duration-200 ease-in-out ${
                  category.children.length > 0 ? "text-gray-300 cursor-not-allowed" : "hover:text-gray-400"
                }`}
              >
                <RiDeleteBin5Line />
              </button>
            </AlertDelete>

            <Link
              to={`/categories/${category.id}`}
              className="text-sm transition duration-200 ease-in-out hover:text-gray-400"
            >
              <MdOutlineEdit />
            </Link>
          </div>
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
      <UlListCat categories={categories} />
    </Card>
  );
}

export default CategoriesList;
