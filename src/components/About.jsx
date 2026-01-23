import React, { useEffect } from "react";
import ProductCard from "./shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/action";
import {
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaAward,
  FaLaptop,
  FaUsers,
  FaChartLine,
  FaStar,
  FaCheckCircle,
  FaGlobeAmericas,
} from "react-icons/fa";

function About() {
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const features = [
    {
      icon: FaShieldAlt,
      title: "100% Authentic",
      description: "Genuine products from authorized distributors",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaTruck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping nationwide",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Expert assistance whenever you need",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FaAward,
      title: "Best Warranty",
      description: "Comprehensive warranty and after-sales service",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { icon: FaUsers, value: "10,000+", label: "Happy Customers" },
    { icon: FaLaptop, value: "500+", label: "Products Available" },
    { icon: FaChartLine, value: "99%", label: "Satisfaction Rate" },
    { icon: FaGlobeAmericas, value: "50+", label: "Cities Covered" },
  ];

  const brands = [
    { name: "Dell", quality: "Premium Business Solutions" },
    { name: "ASUS", quality: "Innovation & Performance" },
    { name: "HP", quality: "Reliability & Trust" },
    { name: "Lenovo", quality: "Enterprise Excellence" },
    { name: "Apple", quality: "Ultimate Premium Experience" },
    { name: "MSI", quality: "Gaming Powerhouse" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About TechZone Laptop
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your Trusted Partner in Premium Technology Solutions
            </p>
          </div>
        </div>
      </div>

      {/* Main Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
                <FaStar className="text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-blue-800">
                  Since 2020
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Elevate Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Technology Experience
                </span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to <strong>TechZone Laptop</strong>, your trusted
                destination for authentic and high-quality laptops. We offer a
                wide range of products — from lightweight models for students
                and professionals to high-performance laptops for gamers and
                creators.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to make premium technology accessible to everyone
                by providing <strong>100% genuine products</strong> from top
                brands like Dell, ASUS, HP, Lenovo, and Apple.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Competitive pricing with regular promotions and exclusive
                    deals
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Fast and reliable shipping with careful packaging
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Exceptional customer support and clear warranty policies
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-xl font-semibold text-gray-900 italic">
                  "A laptop is not just a device — it's your companion on every
                  journey of learning, working, and creating."
                </p>
              </div>
            </div>

            {/* Image Content */}
            <div
              className="relative animate-fadeIn animation-delay-500"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="src/assets/about page/image1.jpg"
                  alt="TechZone Store"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                  <stat.icon className="text-3xl" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose TechZone?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering excellence in every aspect of your
              shopping experience
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="text-white text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted Global Brands
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We partner with the world's leading laptop manufacturers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-500 transform hover:scale-105 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600">{brand.quality}</p>
                  </div>
                  <FaCheckCircle className="text-green-500 text-3xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium laptops
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products &&
              products?.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <ProductCard {...item} about />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Laptop?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the TechZone
            difference today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <FaLaptop className="text-2xl" />
              <span>Shop Now</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <FaHeadset className="text-2xl" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
