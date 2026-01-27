import React, { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import {
  FaExclamationTriangle,
  FaLaptop,
  FaShoppingBag,
  FaStar,
  FaFilter,
  FaCheckCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProducts,
  fetchBrands,
} from "../../store/action";
import Filter from "./Filter";

import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import { useProductFilter } from "../../hooks/useProductFilter";

function Products() {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const { products, categories, brands, pagination } = useSelector(
    (state) => state.products,
  );
  const dispatch = useDispatch();

  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  const emptyProducts = !products || products.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
              <FaLaptop className="text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Premium Laptop Collection
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover high-performance laptops from world-leading brands
            </p>
            <div className="w-24 h-1 bg-white mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <div className="mb-8 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <FaFilter className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Filter & Search
              </h3>
            </div>
            <Filter
              categories={categories ? categories : []}
              brands={brands ? brands : []}
            />
          </div>
        </div>

        {/* Products Count & View Options */}
        {!isLoading && !errorMessage && !emptyProducts && (
          <div className="flex items-center justify-between mb-8 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <FaShoppingBag className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  All Products
                </h2>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <FaCheckCircle className="text-green-500" />
                  Showing {products?.length || 0} of{" "}
                  {pagination?.totalElements || 0} products
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-xl shadow-lg">
              <FaStar className="text-white text-xl" />
              <span className="text-sm font-bold text-white">
                Premium Quality Guaranteed
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="py-20">
            <Loader text="Loading amazing products..." />
          </div>
        ) : errorMessage ? (
          /* Error State */
          <div className="flex flex-col justify-center items-center py-20 animate-fadeIn">
            <div className="bg-red-50 rounded-full p-8 mb-6 shadow-xl">
              <FaExclamationTriangle className="text-red-500 text-6xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 text-lg mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        ) : emptyProducts ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-16 shadow-2xl border-4 border-gray-100">
                <FaLaptop className="text-gray-400 text-9xl" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              No Products Found
            </h2>
            <p className="text-gray-600 text-xl mb-8 text-center max-w-md">
              We couldn't find any products matching your criteria. Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
            >
              <FaFilter className="text-xl" />
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="min-h-[700px]">
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {products &&
                products.map((item, i) => (
                  <div
                    key={i}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <ProductCard {...item} />
                  </div>
                ))}
            </div>

            {/* Pagination */}
            {pagination?.totalPages > 1 && (
              <div className="flex justify-center pt-10 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <Paginations
                    numberOfPage={pagination?.totalPages}
                    totalProducts={pagination?.totalElements}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Trust Badges Section */}
      {!isLoading && !errorMessage && !emptyProducts && (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-16 mt-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Why Shop With Us?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center animate-fadeIn bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
                  <span className="text-3xl font-bold text-white">
                    {pagination?.totalElements || 0}+
                  </span>
                </div>
                <p className="text-gray-600 font-semibold">
                  Products Available
                </p>
              </div>
              <div
                className="text-center animate-fadeIn bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
                  <FaCheckCircle className="text-white text-3xl" />
                </div>
                <p className="text-gray-600 font-semibold">100% Authentic</p>
              </div>
              <div
                className="text-center animate-fadeIn bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4">
                  <span className="text-3xl font-bold text-white">10K+</span>
                </div>
                <p className="text-gray-600 font-semibold">Happy Customers</p>
              </div>
              <div
                className="text-center animate-fadeIn bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4">
                  <span className="text-2xl font-bold text-white">24/7</span>
                </div>
                <p className="text-gray-600 font-semibold">Support</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
