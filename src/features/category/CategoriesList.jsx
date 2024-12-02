import Loader from "@/ui/Loader";
import useCategories from "./useCategories";
import Card from "@/ui/Card";

function UlListCat({ categories }) {
  return (
    <ul className="px-5">
      {categories.map((category) => (
        <li key={category.id}>
          {category.name}
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
