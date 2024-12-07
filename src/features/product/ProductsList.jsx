import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Card from "@/ui/Card";
import Loader from "@/ui/Loader";
import useProducts from "./useProducts";
import ProductsItem from "./ProductsItem";

function ProductsList() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <Loader />;

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
    </Card>
  );
}

export default ProductsList;
