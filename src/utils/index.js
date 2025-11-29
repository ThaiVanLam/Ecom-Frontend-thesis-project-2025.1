import { href } from "react-router-dom";
import { bannerImageOne, bannerImageThree, bannerImageTwo } from "./constant";
import { FaBoxOpen, FaHome, FaStore, FaThList } from "react-icons/fa";

export const bannerLists = [
  {
    id: 1,
    image: bannerImageOne,
    title: "Power Your Productivity",
    subtitle: "Business Laptops",
    description:
      "Boost your workflow with powerful and reliable business laptops",
  },
  {
    id: 2,
    image: bannerImageTwo,
    title: "Performance Meets Portability",
    subtitle: "Ultrabooks",
    description: "Sleek, lightweight, and designed for professionals on the go",
  },
  {
    id: 3,
    image: bannerImageThree,
    title: "Next-Gen Gaming",
    subtitle: "Gaming Laptops",
    description:
      "Unleash top-tier performance with the latest RTX-powered gaming laptops",
  },
];

export const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: FaHome, current: true },
  { name: "Products", href: "/admin/products", icon: FaBoxOpen, current: true },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FaThList,
  },
  { name: "Sellers", href: "/admin/sellers", icon: FaStore },
];
