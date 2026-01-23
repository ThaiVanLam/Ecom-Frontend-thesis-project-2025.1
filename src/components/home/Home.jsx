import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/action";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import {
  FaExclamationTriangle,
  FaShippingFast,
  FaHeadset,
  FaShieldAlt,
  FaArrowRight,
  FaLaptop,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Banner from "./Banner";

function Home() {
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Banner/Slider Section */}
      <Banner />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 group-hover:animate-bounce">
                <FaShippingFast className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600">
                Fast & reliable delivery on all orders
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 group-hover:animate-bounce animation-delay-200">
                <FaHeadset className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Expert assistance whenever you need
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 group-hover:animate-bounce animation-delay-400">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
                <FaStar className="text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-blue-800">
                  Why Choose TechZone
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Premium Quality,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Trusted Service
                </span>
              </h2>

              <p className="text-lg text-gray-600">
                At TechZone Laptop, we're committed to delivering the best
                technology solutions. Our curated collection features only 100%
                genuine products from top brands like Dell, ASUS, HP, Lenovo,
                and Apple.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      100% Authentic Products
                    </h4>
                    <p className="text-gray-600">
                      All laptops are sourced directly from authorized
                      distributors
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Best Price Guarantee
                    </h4>
                    <p className="text-gray-600">
                      Competitive pricing with regular promotions and discounts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Comprehensive Warranty
                    </h4>
                    <p className="text-gray-600">
                      Clear warranty policies and exceptional after-sales
                      service
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/about">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                  <span>Learn More About Us</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="relative animate-fadeIn animation-delay-500">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80"
                  alt="Modern Office Setup"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium laptops
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {isLoading ? (
            <Loader text="Loading amazing products..." />
          ) : errorMessage ? (
            <div className="flex flex-col justify-center items-center h-[300px] animate-fadeIn">
              <div className="bg-red-50 rounded-full p-6 mb-4">
                <FaExclamationTriangle className="text-red-500 text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 text-lg">{errorMessage}</p>
            </div>
          ) : (
            <>
              <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8 mb-12">
                {products &&
                  products?.slice(0, 8).map((item, i) => (
                    <div
                      key={i}
                      className="animate-fadeIn"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <ProductCard {...item} />
                    </div>
                  ))}
              </div>

              <div className="text-center animate-fadeIn">
                <Link to="/products">
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                    <span>View All Products</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fadeIn">
              <div className="text-5xl md:text-6xl font-bold mb-2">500+</div>
              <div className="text-blue-100 text-lg">Premium Products</div>
            </div>
            <div className="animate-fadeIn animation-delay-200">
              <div className="text-5xl md:text-6xl font-bold mb-2">10K+</div>
              <div className="text-blue-100 text-lg">Happy Customers</div>
            </div>
            <div className="animate-fadeIn animation-delay-400">
              <div className="text-5xl md:text-6xl font-bold mb-2 flex items-center justify-center gap-2">
                <span>4.9</span>
                <FaStar className="text-yellow-400 text-3xl" />
              </div>
              <div className="text-blue-100 text-lg">Customer Rating</div>
            </div>
            <div className="animate-fadeIn animation-delay-500">
              <div className="text-5xl md:text-6xl font-bold mb-2">100%</div>
              <div className="text-blue-100 text-lg">Authentic Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Find Your Perfect Laptop?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and upgrade your tech today.
              Experience the perfect blend of performance and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <button className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                  <FaLaptop className="text-2xl group-hover:animate-bounce" />
                  <span>Start Shopping</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-10 py-5 bg-white border-2 border-gray-300 text-gray-800 rounded-lg font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 inline-flex items-center gap-3">
                  <span>Contact Us</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
