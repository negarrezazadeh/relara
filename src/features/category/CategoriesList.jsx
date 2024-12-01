import Loader from "@/ui/Loader";
import useCategories from "./useCategories";
import Card from "@/ui/Card";

function CategoriesList() {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <Loader />;

  return (
    <Card>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </Card>
  );
}

export default CategoriesList;
