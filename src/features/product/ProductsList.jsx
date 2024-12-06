import Loader from "@/ui/Loader";
import useProducts from "./useProducts";
import Card from "@/ui/Card";

function ProductsList() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <Loader />;

  return (
    <Card>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default ProductsList;
