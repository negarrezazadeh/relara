import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Card from "@/ui/Card";
import Loader from "@/ui/Loader";
import ProductVariantItem from "./ProductVariantItem";
import useGetProductById from "../useGetProductById";

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
      {product.variants.length > 0 ? (
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
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-center font-semibold text-gray-100">
            This Product has no variants. Do You Want to add?
          </p>
          <Link to={`/product-variants/create/${product.id}`}>
            <Button className="mx-auto mt-4 bg-gray-200 text-black hover:bg-gray-700 hover:text-white">
              Add Variant
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}

export default ProductVariantsList;
