import { Link } from "react-router-dom";
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
import useProducts from "./useProducts";
import ProductsItem from "./ProductsItem";

function ProductsList() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <Loader />;  

  return (
    <Card>
      {products.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Product Variants</TableHead>
              <TableHead className="pr-14 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <ProductsItem
                key={product.id}
                product={product}
                productIndex={index + 1}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center my-2">
          <p className="text-center font-semibold text-violet-400">
            No products found. Do you want to add one?
          </p>
          <Link to={`/products/create`}>
            <Button className="mx-auto mt-5 bg-gray-200 text-black hover:bg-gray-700 hover:text-white">
              Add Product
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}

export default ProductsList;
