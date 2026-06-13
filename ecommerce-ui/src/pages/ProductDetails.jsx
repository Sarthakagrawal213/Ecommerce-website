import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);
   const deleteProduct = async () => {
  try {
    await fetch(`http://localhost:8080/api/products/${id}/delete`, {
      method: "DELETE",
    });

    alert("Product deleted successfully");

    navigate("/"); // go back to home

  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
};
  const updateProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("name", editData.name);
      formData.append("description", editData.description);
      formData.append("brand", editData.brand);
      formData.append("price", editData.price);
      formData.append("category", editData.category);
      formData.append("releaseDate", editData.releaseDate);
      formData.append("availability", editData.availability);
      formData.append("stockQuantity", editData.stockQuantity);

      if (image) {
        formData.append("image", image);
      }

      await fetch(
        `http://localhost:8080/api/products/${id}/update`,
        {
          method: "PUT",
          body: formData,
        }
      );

      alert("Product Updated!");
      window.location.reload();

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
          Loading Product...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto p-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-12"
          >

            {/* IMAGE */}
            <div className="h-[500px] rounded-3xl overflow-hidden bg-slate-800 shadow-2xl">
              {product.imagename ? (
                <img
                  src={`http://localhost:8080/api/products/${product.id}/image`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-9xl bg-gradient-to-br from-cyan-500 to-purple-600">
                  📦
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div>
              <span className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full">
                {product.category}
              </span>

              <h1 className="text-6xl font-bold mt-5">
                {product.name}
              </h1>

              <p className="text-gray-400 mt-6 text-lg">
                {product.description}
              </p>

              <div className="mt-8 space-y-4 text-lg">
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Stock:</strong> {product.stockQuantity}</p>
                <p>
                  <strong>Release Date:</strong>{" "}
                  {new Date(product.releaseDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {product.availability ? "In Stock" : "Out Of Stock"}
                </p>
              </div>

              <h2 className="text-5xl font-bold text-cyan-400 mt-10">
                ₹{product.price}
              </h2>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-10">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditData(product);
                  }}
                  className="bg-yellow-500 px-6 py-3 rounded-xl font-bold"
                >
                  Edit Product
                </button>
                <button
  onClick={deleteProduct}
  className="
    bg-red-500
    px-6 py-3
    rounded-xl
    font-bold
    hover:bg-red-600
    transition
  "
>
  Delete Product
</button>
              </div>

              {/* EDIT FORM */}
             {isEditing && editData && (
  <div className="mt-10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-white/10 shadow-2xl">

    <h2 className="text-2xl font-bold mb-6 text-cyan-400">
      Edit Product
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <input
        className="p-3 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Name"
        value={editData.name}
        onChange={(e) =>
          setEditData({ ...editData, name: e.target.value })
        }
      />

      <input
        className="p-3 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Brand"
        value={editData.brand}
        onChange={(e) =>
          setEditData({ ...editData, brand: e.target.value })
        }
      />

      <input
        className="p-3 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Category"
        value={editData.category}
        onChange={(e) =>
          setEditData({ ...editData, category: e.target.value })
        }
      />

      <input
        className="p-3 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
        type="number"
        placeholder="Price"
        value={editData.price}
        onChange={(e) =>
          setEditData({ ...editData, price: e.target.value })
        }
      />

      <input
        className="p-3 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
        type="number"
        placeholder="Stock Quantity"
        value={editData.stockQuantity}
        onChange={(e) =>
          setEditData({ ...editData, stockQuantity: e.target.value })
        }
      />

      <input
        className="p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
        type="date"
        value={
          editData.releaseDate
            ? editData.releaseDate.split("T")[0]
            : ""
        }
        onChange={(e) =>
          setEditData({ ...editData, releaseDate: e.target.value })
        }
      />

    </div>

    <textarea
      className="w-full mt-5 p-3 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
      placeholder="Description"
      rows="4"
      value={editData.description}
      onChange={(e) =>
        setEditData({ ...editData, description: e.target.value })
      }
    />

    <div className="mt-5">
      <label className="text-gray-300">Update Image</label>
      <input
        type="file"
        className="w-full mt-2 text-white"
        onChange={(e) => setImage(e.target.files[0])}
      />
    </div>

    <div className="flex gap-4 mt-6">
      <button
        onClick={updateProduct}
        className="bg-cyan-500 px-6 py-3 rounded-xl font-bold hover:bg-cyan-600 transition"
      >
        Save Changes
      </button>

      <button
        onClick={() => setIsEditing(false)}
        className="bg-red-500 px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition"
      >
        Cancel
      </button>
    </div>

  </div>
)}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}