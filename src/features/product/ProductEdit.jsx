import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import useGetProductById from "./useGetProductById";
import { Loader } from "lucide-react";

function ProductEdit() {
  const { id } = useParams();

  const { product, isLoading } = useGetProductById(id);

  if (isLoading) return <Loader />;

  return <ProductForm product={product} />;
}

export default ProductEdit;
