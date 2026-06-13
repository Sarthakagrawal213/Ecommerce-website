import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/add"
          element={<AddProduct />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;