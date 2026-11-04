import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { WishlistProvider } from "./context/WishlistContext";
import Footer from "./components/common/Footer";


function App() {
  return (
    <>
     
      
      <AuthProvider>
        <WishlistProvider>
          <Navbar />
          <AppRoutes />
        </WishlistProvider>
      </AuthProvider>
      <Footer />
    </>
  );
}

export default App;