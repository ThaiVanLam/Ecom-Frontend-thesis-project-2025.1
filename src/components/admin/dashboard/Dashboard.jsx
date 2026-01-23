import { useEffect, useState } from "react";
import DashboardOverview from "./DashboardOverview";
import {
  FaBoxOpen,
  FaDollarSign,
  FaShoppingCart,
  FaUserFriends,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaStore,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaPercent,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { analyticsAction } from "../../../store/action";
import Loader from "../../shared/Loader";
import ErrorPage from "../../shared/ErrorPage";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

function Dashboard() {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const {
    analytics: { productCount, totalRevenue, totalOrders },
  } = useSelector((state) => state.admin);

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    dispatch(analyticsAction());
  }, [dispatch]);

  // Mock data cho các thống kê bổ sung (trong thực tế sẽ lấy từ API)
  const additionalStats = {
    todayOrders: 12,
    pendingOrders: 8,
    completedOrders: Math.floor(totalOrders * 0.75) || 45,
    averageOrderValue:
      totalRevenue && totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0,
    totalCustomers: 350,
    activeProducts: Math.floor(productCount * 0.9) || productCount,
    lowStockProducts: 5,
    revenueGrowth: 12.5, // %
  };

  // Data cho biểu đồ doanh thu theo tháng
  const revenueChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue ($)",
        data: [
          12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 35000, 38000,
          40000, 42000,
        ],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Data cho biểu đồ đơn hàng theo trạng thái
  const orderStatusData = {
    labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [15, 25, 30, 120, 10],
        backgroundColor: [
          "rgba(251, 191, 36, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgb(251, 191, 36)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
          "rgb(34, 197, 94)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Data cho biểu đồ sản phẩm bán chạy
  const topProductsData = {
    labels: [
      "Dell XPS 15",
      "MacBook Pro",
      "HP Spectre",
      "Lenovo ThinkPad",
      "ASUS ROG",
    ],
    datasets: [
      {
        label: "Units Sold",
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {isAdmin ? "Admin" : "Seller"}! 👋
            </h1>
            <p className="text-blue-100">
              Here's what's happening with your store today
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">
                {additionalStats.todayOrders}
              </div>
              <div className="text-sm text-blue-100">Today's Orders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardOverview
          title="Total Revenue"
          amount={totalRevenue}
          Icon={FaDollarSign}
          revenue
          trend={additionalStats.revenueGrowth}
          trendUp={true}
          bgGradient="from-green-500 to-emerald-600"
        />
        <DashboardOverview
          title="Total Orders"
          amount={totalOrders}
          Icon={FaShoppingCart}
          trend={8.2}
          trendUp={true}
          bgGradient="from-blue-500 to-cyan-600"
        />
        <DashboardOverview
          title="Total Products"
          amount={productCount}
          Icon={FaBoxOpen}
          bgGradient="from-purple-500 to-pink-600"
        />
        <DashboardOverview
          title="Total Customers"
          amount={additionalStats.totalCustomers}
          Icon={FaUserFriends}
          trend={5.3}
          trendUp={true}
          bgGradient="from-orange-500 to-red-600"
        />
      </div>

      {/* Secondary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Pending Orders
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {additionalStats.pendingOrders}
              </p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-full">
              <FaClock className="text-yellow-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Completed Orders
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {additionalStats.completedOrders}
              </p>
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <FaCheckCircle className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Avg Order Value
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                ${additionalStats.averageOrderValue}
              </p>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <FaChartLine className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Low Stock Items
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {additionalStats.lowStockProducts}
              </p>
            </div>
            <div className="p-4 bg-red-100 rounded-full">
              <FaBoxOpen className="text-red-600 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaChartLine className="text-blue-600" />
              Revenue Overview
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold flex items-center gap-1">
                <FaArrowUp className="text-xs" />+
                {additionalStats.revenueGrowth}%
              </span>
            </div>
          </div>
          <div style={{ height: "300px" }}>
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaShoppingCart className="text-purple-600" />
            Order Status Distribution
          </h3>
          <div style={{ height: "300px" }}>
            <Doughnut data={orderStatusData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Products Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaStore className="text-indigo-600" />
          Top Selling Products
        </h3>
        <div style={{ height: "300px" }}>
          <Bar data={topProductsData} options={chartOptions} />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-500 rounded-xl shadow-lg">
              <FaTruck className="text-white text-3xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Shipped Today</p>
              <p className="text-3xl font-bold text-gray-800">24</p>
              <p className="text-sm text-green-600 font-semibold flex items-center gap-1 mt-1">
                <FaArrowUp className="text-xs" /> +18% vs yesterday
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-500 rounded-xl shadow-lg">
              <FaPercent className="text-white text-3xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Conversion Rate
              </p>
              <p className="text-3xl font-bold text-gray-800">3.2%</p>
              <p className="text-sm text-green-600 font-semibold flex items-center gap-1 mt-1">
                <FaArrowUp className="text-xs" /> +0.5% vs last week
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-500 rounded-xl shadow-lg">
              <FaBoxOpen className="text-white text-3xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Active Products
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {additionalStats.activeProducts}
              </p>
              <p className="text-sm text-gray-600 font-medium mt-1">
                {productCount - additionalStats.activeProducts} inactive
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
