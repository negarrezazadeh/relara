import { useParams } from "react-router-dom";
import ProductVariantForm from "./ProductVariantForm";
import Loader from "@/ui/Loader";
import useGetProductVariantById from "./useGetProductVariantById";

function ProductVariantEdit() {
  const { id } = useParams();

  const { productVariant, isLoading } = useGetProductVariantById(id);

  if (isLoading) return <Loader />;
  
  // Convert attribute_values to default values
  const defaultAttributes = productVariant.attribute_values.reduce(
    (acc, attr) => {
      acc[attr.attribute_name] = attr.id.toString(); // Use `id` as string for compatibility with RadioGroup
      return acc;
    },
    {},
  );

  return (
    <ProductVariantForm
      product={productVariant}
      isEditing={true}
      ProductAttributes={defaultAttributes}
    />
  );
}

export default ProductVariantEdit;
