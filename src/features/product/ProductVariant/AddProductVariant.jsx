import { useParams } from "react-router-dom";
import ProductVariantForm from "./ProductVariantForm";
import useGetProductById from "../useGetProductById";
import Loader from "@/ui/Loader";

function AddProductVariant() {
  const { id } = useParams();

  const { product, isLoading } = useGetProductById(id);

  if (isLoading) return <Loader />;

  return <ProductVariantForm product={product}/>;
}

export default AddProductVariant;
