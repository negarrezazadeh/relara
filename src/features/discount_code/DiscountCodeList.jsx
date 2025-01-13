import Card from "@/ui/Card";
import useGetDiscountCodes from "./useGetDiscountCodes";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/ui/Loader";
import DiscountCodeItem from "./DiscountCodeItem";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function DiscountCodeList() {
  const { discountCodes, isLoading } = useGetDiscountCodes();
  
  if (isLoading) return <Loader />;

  return (
    <Card>
      {discountCodes.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead>Discount Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Usage Limit</TableHead>
              <TableHead>Expire At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discountCodes.map((code, index) => (
              <DiscountCodeItem
                key={code.id}
                discountCode={code}
                discountCodeIndex={index + 1}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="my-2 flex flex-col items-center">
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

export default DiscountCodeList;
