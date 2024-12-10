import ProductVariantsList from "@/features/product/ProductVariant/ProductVariantsList";
import DashboardTitle from "@/ui/DashboardTitle";

function ProductVariantsPage() {
  return (
    <div>
      <DashboardTitle>Product Variants</DashboardTitle>
      <ProductVariantsList />
    </div>
  );
}

export default ProductVariantsPage;