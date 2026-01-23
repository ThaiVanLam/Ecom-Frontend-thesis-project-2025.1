import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PriceRangeFilter from "./PriceRangeFilter";

const Filter = ({ categories }) => {
  // const categories = [
  //   { categoryId: 1, categoryName: "Gaming Laptops" },
  //   { categoryId: 1, categoryName: "Business Laptops" },
  //   { categoryId: 1, categoryName: "Student Laptops" },
  //   { categoryId: 1, categoryName: "Ultrabook" },
  //   { categoryId: 1, categoryName: "Workstation" },
  //   { categoryId: 1, categoryName: "Graphics Laptops" },
  // ];

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // for range
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortby") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    // for range
    const currentMinPrice = searchParams.get("minPrice");
    const currentMaxPrice = searchParams.get("maxPrice");

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);

    // for range
    setMinPrice(currentMinPrice ? Number(currentMinPrice) : null);
    setMaxPrice(currentMaxPrice ? Number(currentMaxPrice) : null);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm?.trim()) {
        params.set("keyword", searchTerm.trim());
      } else {
        params.delete("keyword");
      }
      navigate(`${pathname}?${params.toString()}`);
    }, 700);
    return () => {
      clearTimeout(handler);
    };
  }, [searchParams, searchTerm, navigate, pathname]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${pathname}?${params}`);
    setCategory(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      params.set("sortby", newOrder);
      navigate(`${pathname}?${params}`);
      return newOrder;
    });
  };

  // for range
  const handlePriceChange = (min, max) => {
    if (min !== null && min >= 0) {
      params.set("minPrice", min.toString());
      setMinPrice(min);
    } else {
      params.delete("minPrice");
      setMinPrice(null);
    }

    if (max !== null && max >= 0) {
      params.set("maxPrice", max.toString());
      setMaxPrice(max);
    } else {
      params.delete("maxPrice");
      setMaxPrice(null);
    }

    navigate(`${pathname}?${params}`);
  };

  const handleClearFilters = () => {
    params.delete("sortby");
    params.delete("category");
    params.delete("keyword");

    // for range
    params.delete("minPrice");
    params.delete("maxPrice");
    navigate(`${pathname}?${params}`);

    // for range
    setMinPrice(null);
    setMaxPrice(null);
  };

  return (
    <div className="space-y-4">
      {/* Search and Sort Controls */}
      <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
        {/* SEARCH BAR */}
        <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search Products"
            className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
          />
          <FiSearch className="absolute left-3 text-slate-800 size={20}" />
        </div>

        {/* CATEGORY SELECTION & SORT */}
        <div className="flex sm:flex-row flex-col gap-4 items-center">
          <FormControl
            variant="outlined"
            size="small"
            className="text-slate-800 border-slate-700"
          >
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={category}
              onChange={handleCategoryChange}
              label="Category"
              className="min-w-[120px] text-slate-800 border-slate-700"
            >
              <MenuItem value="all">All</MenuItem>
              {categories.map((item) => (
                <MenuItem value={item.categoryName} key={item.categoryId}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Tooltip title="Sorted by price: asc">
            <Button
              variant="contained"
              color="primary"
              className="flex items-center gap-2 h-10"
              onClick={toggleSortOrder}
            >
              Sort By
              {sortOrder === "asc" ? (
                <FiArrowDown size={20} />
              ) : (
                <FiArrowUp size={20} />
              )}
            </Button>
          </Tooltip>

          <button
            className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer"
            onClick={handleClearFilters}
          >
            <FiRefreshCw className="font-semibold" size={16} />
            <span className="font-semibold">Clear Filters</span>
          </button>
        </div>
      </div>

      {/* Price Range Filter */}
      <PriceRangeFilter
        onPriceChange={handlePriceChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
};

export default Filter;
