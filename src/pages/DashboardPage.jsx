import DashboardChart from "@/features/chart/DashboardChart";
import Card from "@/ui/Card";
import DashboardTitle from "@/ui/DashboardTitle";

function DashboardPage() {
  return (
    <>
      <DashboardTitle>Dashboard</DashboardTitle>
      <Card>
        <p className="text-md font-semibold">Hello 👋🏼, Welcome to Relara</p>
        <DashboardChart />
      </Card>
    </>
  );
}

export default DashboardPage;
