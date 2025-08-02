import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Table } from "@/components/ui/table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

ChartJS.defaults.color = "#e5e7eb";
ChartJS.defaults.borderColor = "#374151";

export default function DashboardChart() {
  //Monthly sales data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 1700, 2100, 2500, 3000],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
      },
    ],
  };

  //Order status data
  const ordersData = {
    labels: ["Pending", "Shipped", "Delivered"],
    datasets: [
      {
        data: [12, 19, 7],
        backgroundColor: ["#facc15", "#34d399", "#60a5fa"],
      },
    ],
  };

  const statisticsCards = [
    { title: "Total Sales", value: "$12,300" },
    { title: "Orders", value: "320" },
    { title: "Customers", value: "180" },
    { title: "Products", value: "75" },
  ];

  const customers = [
    {
      id: "#1023",
      customer: "Ali",
      date: "2025-07-28",
      amount: "$250",
      status: "Pending",
    },
    {
      id: "#1022",
      customer: "Sara",
      date: "2025-07-27",
      amount: "$540",
      status: "Shipped",
    },
    {
      id: "#1021",
      customer: "Reza",
      date: "2025-07-26",
      amount: "$120",
      status: "Delivered",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {statisticsCards.map((item, index) => (
          <div
            key={index}
            className="bg-dark-700 rounded-xl p-5 text-center shadow dark:bg-gray-800"
          >
            <h3 className="text-sm text-gray-200">{item.title}</h3>
            <p className="mt-2 text-xl font-bold text-gray-200">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-dark-700 rounded-xl p-5 shadow dark:bg-gray-800">
          <h3 className="mb-4 font-semibold text-gray-200">Monthly Sales</h3>
          <Line
            data={salesData}
            height={300}
            // width={800}
            options={{
              // responsive: false,
              plugins: {
                legend: {
                  labels: {
                    color: "#e5e7eb",
                  },
                },
              },
            }}
          />
        </div>
        <div className="bg-dark-700 rounded-xl p-5 shadow dark:bg-gray-800">
          <h3 className="mb-4 font-semibold text-gray-200">Orders Status</h3>
          <Doughnut data={ordersData} />
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-dark-700 rounded-xl p-5 shadow dark:bg-gray-800">
        <h3 className="mb-4 font-semibold text-gray-200">Recent Orders</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((order, index) => (
              <TableRow
                key={index}
                className="rounded-lg bg-gray-700 text-gray-200 odd:bg-gray-800/40 even:bg-gray-800/80"
              >
                <TableCell className="p-3">{order.id}</TableCell>
                <TableCell className="p-3">{order.customer}</TableCell>
                <TableCell className="p-3">{order.date}</TableCell>
                <TableCell className="p-3">{order.amount}</TableCell>
                <TableCell className="p-3">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
