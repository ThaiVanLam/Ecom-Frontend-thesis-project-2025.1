import React, { useEffect } from "react";
import ProductCard from "./shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/action";

function About() {
  const { products } = useSelector((state) => state.products);

  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
        About Us
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full md:w-1/2 text-center md:text-left mr-8">
          <p className="text-lg mb-4">
            Welcome to TechZone Laptop, your trusted destination for authentic
            and high-quality laptops. We offer a wide range of products — from
            lightweight models for students and professionals to
            high-performance laptops for gamers and creators. Our mission is to
            make premium technology accessible to everyone by providing 100%
            genuine products from top brands like Dell, ASUS, HP, Lenovo, and
            Apple. At TechZone, we’re committed to delivering the best prices,
            fast and reliable shipping, and exceptional customer support. We
            also provide comprehensive after-sales service and clear warranty
            policies to ensure your satisfaction. Because we believe a laptop is
            not just a device — it’s your companion on every journey of
            learning, working, and creating. TechZone – Elevate your technology
            experience.
          </p>
        </div>
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="src/assets/about page/image1.jpg"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          ></img>
        </div>
      </div>

      <div className="py-7 space-y-8">
        <h1 className="text-slate-800 text-4xl font-bold text-center">
          Our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products &&
            products
              ?.slice(0, 4)
              .map((item, i) => <ProductCard key={i} {...item} about />)}
        </div>
      </div>
    </div>
  );
}

export default About;
