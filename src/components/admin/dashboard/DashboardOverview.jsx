import React from "react";
import { formatRevenue } from "../../../utils/formatPrice";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function DashboardOverview({
  title,
  amount,
  Icon,
  revenue = false,
  trend = null,
  trendUp = true,
  bgGradient = "from-blue-500 to-purple-600",
}) {
  const convertedAmount = revenue ? Number(amount).toFixed(2) : amount;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${bgGradient} p-4`}>
        <div className="flex items-center justify-between">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
            <Icon className="text-white text-3xl" />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                trendUp
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {trendUp ? (
                <FaArrowUp className="text-xs" />
              ) : (
                <FaArrowDown className="text-xs" />
              )}
              {trend}%
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
          {title}
        </h3>
        <div className="flex items-end justify-between">
          <div className="text-4xl font-bold text-gray-800">
            {revenue ? "$" : null}
            {revenue ? formatRevenue(convertedAmount) : convertedAmount}
          </div>
        </div>
        {trend && (
          <p className="text-xs text-gray-500 mt-2">
            {trendUp ? "↑" : "↓"} {trend}% from last month
          </p>
        )}
      </div>

      {/* Bottom accent line */}
      <div className={`h-1 bg-gradient-to-r ${bgGradient}`}></div>
    </div>
  );
}

export default DashboardOverview;
