import Loader from "@/ui/Loader";
import CategoryForm from "./CategoryForm";
import useGetCategoryById from "./useGetCategoryById";
import { useParams } from "react-router-dom";

function CategoryEdit() {
  const { id } = useParams();
  const { category, isLoading } = useGetCategoryById(id);

  if (isLoading) return <Loader />;

  return <CategoryForm category={category} />;
}

export default CategoryEdit;
