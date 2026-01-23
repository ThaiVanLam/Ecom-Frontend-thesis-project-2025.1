import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Power Your Productivity",
    subtitle: "Business Laptops",
    description:
      "Boost your workflow with powerful and reliable business laptops designed for professionals",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80",
    gradient: "from-blue-600 to-cyan-500",
    badge: "Professional",
  },
  {
    id: 2,
    title: "Performance Meets Portability",
    subtitle: "Ultrabooks",
    description:
      "Sleek, lightweight, and designed for professionals on the go. Style meets substance.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80",
    gradient: "from-purple-600 to-pink-500",
    badge: "Premium",
  },
  {
    id: 3,
    title: "Next-Gen Gaming",
    subtitle: "Gaming Laptops",
    description:
      "Unleash top-tier performance with the latest RTX-powered gaming laptops for ultimate gaming experience",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&q=80",
    gradient: "from-red-600 to-orange-500",
    badge: "Gaming",
  },
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="relative h-[600px] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-700 ${
            index === currentSlide
              ? "opacity-100 translate-x-0 z-10"
              : index < currentSlide
                ? "opacity-0 -translate-x-full z-0"
                : "opacity-0 translate-x-full z-0"
          }`}
        >
          {/* Background Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90`}
          ></div>

          {/* Background Image */}
          <img
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />

          {/* Animated Blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="text-white max-w-2xl space-y-6">
              {/* Badge */}
              <div
                className="inline-block animate-fadeIn"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30 shadow-lg">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  {banner.badge}
                </div>
              </div>

              {/* Subtitle */}
              <div
                className="animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
              >
                <p className="text-xl md:text-2xl font-medium text-white/90">
                  {banner.subtitle}
                </p>
              </div>

              {/* Title */}
              <h2
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fadeIn"
                style={{ animationDelay: "0.4s" }}
              >
                {banner.title}
              </h2>

              {/* Description */}
              <p
                className="text-lg md:text-xl text-white/90 max-w-xl animate-fadeIn"
                style={{ animationDelay: "0.5s" }}
              >
                {banner.description}
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fadeIn"
                style={{ animationDelay: "0.6s" }}
              >
                <Link to="/products">
                  <button className="group px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <span>Shop Now</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/about">
                  <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/30 backdrop-blur-sm rounded-full hover:bg-white/50 transition-all duration-300 group opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-white text-xl group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/30 backdrop-blur-sm rounded-full hover:bg-white/50 transition-all duration-300 group opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-white text-xl group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-12 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: isPaused
              ? "100%"
              : `${((currentSlide + 1) / banners.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export default Banner;
