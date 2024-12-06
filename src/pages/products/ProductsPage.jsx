import ProductsList from "@/features/product/ProductsList";
import DashboardTitle from "@/ui/DashboardTitle";

function ProductsPage() {
  return (
    <div>
      <DashboardTitle>Products</DashboardTitle>
      <ProductsList />
    </div>
  );
}

export default ProductsPage;
