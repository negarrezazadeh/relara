import { useParams } from "react-router-dom";
import DiscountCodeForm from "./DiscountCodeForm";
import useGetDiscountCodeById from "./useGetDiscountCodeById";
import Loader from "@/ui/Loader";

function DiscountCodeEdit() {
  const { id } = useParams();

  const { discountCodes, isLoading } = useGetDiscountCodeById(id);

  if (isLoading) return <Loader />;

  return <DiscountCodeForm DiscountCode={discountCodes} />;
}

export default DiscountCodeEdit;
