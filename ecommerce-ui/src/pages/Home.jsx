import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch products OR search results
  useEffect(() => {
    const url = debouncedSearch
      ? `http://localhost:8080/api/products/search?keyword=${debouncedSearch}`
      : `http://localhost:8080/api/products`;

    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [debouncedSearch]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0f172a] text-white">

        {/* Hero Section */}
        <section className="py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold"
          >
            Welcome To
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="
              text-8xl
              font-extrabold
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              text-transparent
              bg-clip-text
            "
          >
            NeoShop
          </motion.h1>

          <p className="text-gray-400 mt-4 text-lg">
            Premium Shopping Experience
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 flex justify-center">
            <div className="relative w-[90%] md:w-[500px]">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-white/10
                  text-white
                  border
                  border-white/20
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                  backdrop-blur-lg
                "
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Products
          </h2>

          {loading ? (
            <div className="text-center text-xl">
              {debouncedSearch
                ? `Searching for "${debouncedSearch}"...`
                : "Loading Products..."}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-400 text-xl">
              No products found 😢
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -10,
                  }}
                  className="
                    cursor-pointer
                    bg-white/5
                    backdrop-blur-lg
                    border
                    border-white/10
                    rounded-3xl
                    overflow-hidden
                    shadow-xl
                    hover:shadow-cyan-500/20
                    transition-all
                  "
                >

                  {/* Product Image */}
                  <div className="h-52 overflow-hidden">
                    {product.imagename ? (
                      <img
                        src={`http://localhost:8080/api/products/${product.id}/image`}
                        alt={product.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition
                          duration-500
                          hover:scale-110
                        "
                      />
                    ) : (
                      <div
                        className="
                          h-full
                          bg-gradient-to-br
                          from-cyan-500
                          via-blue-500
                          to-purple-600
                          flex
                          items-center
                          justify-center
                          text-7xl
                        "
                      >
                        📦
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold">
                        {product.name}
                      </h3>

                      <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                        {product.category}
                      </span>
                    </div>

                    <p className="text-gray-400 mt-3">
                      {product.description}
                    </p>

                    <div className="mt-5 space-y-2 text-sm text-gray-300">
                      <p>
                        <span className="font-semibold text-white">
                          Brand:
                        </span>{" "}
                        {product.brand}
                      </p>

                      <p>
                        <span className="font-semibold text-white">
                          Stock:
                        </span>{" "}
                        {product.stockQuantity}
                      </p>

                      <p>
                        <span className="font-semibold text-white">
                          Released:
                        </span>{" "}
                        {new Date(product.releaseDate).toLocaleDateString()}
                      </p>

                      <p>
                        <span className="font-semibold text-white">
                          Status:
                        </span>{" "}
                        {product.availability ? (
                          <span className="text-green-400">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-red-400">
                            Out of Stock
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-3xl font-bold text-cyan-400">
                        ₹{product.price}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`${product.name} added to cart`);
                        }}
                        className="
                          px-5
                          py-2
                          rounded-xl
                          bg-cyan-500
                          hover:bg-cyan-600
                          transition
                          font-semibold
                        "
                      >
                        Add To Cart
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}