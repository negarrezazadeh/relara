import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Card from "@/ui/Card";
import Loader from "@/ui/Loader";
import useGetProductById from "../useGetProductById";
import ProductVariantItem from "./ProductVariantItem";
import { useParams } from "react-router-dom";

function ProductVariantsList() {
  const { id } = useParams();
  const { product, isLoading } = useGetProductById(id);

  if (isLoading) return <Loader />;

  const uniqueAttributes = [
    ...new Set(
      product.variants.flatMap((variant) =>
        variant.attribute_values.map((value) => value.attribute_name),
      ),
    ),
  ];

  return (
    <Card>
      <p className="mb-6 mt-2 border-l border-gray-600 pl-2 text-lg font-bold">
        Variants for
        <span className="px-2 text-xl font-semibold text-violet-500">
          {product.name}
        </span>
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {uniqueAttributes.map((attribute, index) => (
              <TableHead key={index}>{attribute}</TableHead>
            ))}
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.variants.map((variant, index) => (
            <ProductVariantItem
              key={variant.id}
              variant={variant}
              index={index}
              uniqueAttributes={uniqueAttributes}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default ProductVariantsList;
