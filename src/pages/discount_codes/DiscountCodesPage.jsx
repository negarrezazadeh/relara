import DiscountCodeList from "@/features/discount_code/DiscountCodeList";
import DashboardTitle from "@/ui/DashboardTitle";

function DiscountCodesPage() {
  return (
    <div>
        <DashboardTitle>Discount Codes</DashboardTitle>
        <DiscountCodeList/>
    </div>
  );
}

export default DiscountCodesPage;