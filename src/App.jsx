// src/App.jsx
import { FaBeer } from "react-icons/fa";
import "./App.css";
import Products from "./components/products/Products";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import React from "react";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/auth/Register";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AdminProducts from "./components/admin/products/AdminProducts";
import Sellers from "./components/admin/sellers/Sellers";
import Category from "./components/admin/categories/Category";
import Orders from "./components/admin/orders/Orders";
import Profile from "./components/profile/Profile";
import CustomerOrders from "./components/order/CustomerOrders";
import PriceRangeFilter from "./components/products/PriceRangeFilter";
import Customers from "./components/admin/customers/Customers";

// Component wrapper để kiểm tra route
function ConditionalNavbar() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Không hiển thị Navbar nếu đang ở admin route
  if (isAdminRoute) {
    return null;
  }

  return <Navbar />;
}

function App() {
  return (
    <React.Fragment>
      <Router>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirm" element={<PaymentConfirmation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<CustomerOrders />} />
          </Route>

          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test" element={<PriceRangeFilter />} />
          </Route>

          <Route path="/" element={<PrivateRoute adminOnly />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="sellers" element={<Sellers />} />
              <Route path="orders" element={<Orders />} />
              <Route path="categories" element={<Category />} />
              <Route path="customers" element={<Customers />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

export default App;
