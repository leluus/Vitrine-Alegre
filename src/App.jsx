import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  );
}

export default App;