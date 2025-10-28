import React, { useEffect } from "react";
import HeroBanner from "./HeroBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/action";
import ProductCard from "../shared/ProductCard";

function Home() {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div>
      <HeroBanner />

      <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6 min-h-[400px]">
        {products &&
          products
            ?.slice(0, 8)
            .map((item, i) => <ProductCard key={i} {...item} />)}
      </div>
    </div>
  );
}

export default Home;
