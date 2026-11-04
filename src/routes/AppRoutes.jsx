import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import NewArrivals from "../pages/NewArrivals";
import Checkout from "../pages/Checkout";
import ProductDetails from "../pages/ProductDetails";
import Collections from "../pages/Collections";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import Order from "../pages/Order";
import OrderDetails from "../pages/OrderDetails";

import ProtectedRoute from "./ProtectedRoute";
import Inventory from "../admin/pages/Inventory.jsx";
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import AdminProducts from "../admin/pages/Products";
import AddProduct from "../admin/pages/AddProduct.jsx";
import Categories from "../admin/pages/Categories.jsx";
import Orders from "../admin/pages/Orders.jsx";
import Customers from "../admin/pages/Customers.jsx";
import Discounts from "../admin/pages/Discounts.jsx";
import Gallery from "../admin/pages/Gallery.jsx";
import Payments from "../admin/pages/Payments.jsx";
import Reports from "../admin/pages/Reports.jsx";
import Settings from "../admin/pages/Settings.jsx";
function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          PUBLIC PAGES
      ========================= */}

      <Route path="/" element={<Home />} />
      
      <Route path="/products" element={<Products />} />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />
       <Route
        path="/new-arrivals"
        element={<NewArrivals />}
      />

      <Route
        path="/collections"
        element={<Collections />}
      />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/wishlist" element={<Wishlist />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path ="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Order />
       
    </ProtectedRoute>
  }
/>
<Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  }
/>

<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
   <Route path="products" element={<AdminProducts />} />
   <Route path="products/add" element={<AddProduct />} />
   <Route path="categories" element={<Categories />} />
   <Route path="inventory" element={<Inventory />} />
   <Route path="orders" element={<Orders />} />
   <Route path="customers" element={<Customers />} />
   <Route path="discounts" element={<Discounts />} />
   <Route path="gallery" element={<Gallery />} />
   <Route path="payments" element={<Payments />} />
   <Route path="reports" element={<Reports />} />
   <Route path="settings" element={<Settings />} />
</Route>

      

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          
          </ProtectedRoute>
        }
      />

    </Routes>
    
  );
}

export default AppRoutes;