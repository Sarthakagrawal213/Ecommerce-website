import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function AddProduct() {
  const [data, setData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    availability: true,
    stockQuantity: ""
  });

  const [image, setImage] = useState(null);

  async function submit(e) {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("brand", data.brand);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("releaseDate", data.releaseDate);
    formData.append("availability", data.availability);
    formData.append("stockQuantity", data.stockQuantity);
    formData.append("image", image);

    const response = await fetch(
      "http://localhost:8080/api/products/add",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed");
    }

    alert("Product Added Successfully");

  } catch (err) {
    console.error(err);
    alert("Failed To Add Product");
  }
}

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 flex justify-center py-10">
        <form
  onSubmit={submit}
  className="bg-gradient-to-br from-slate-900 to-slate-800 w-[700px] p-10 rounded-2xl border border-white/10 shadow-2xl"
>
  <h1 className="text-white text-4xl font-bold mb-8 text-center">
    Add Product
  </h1>

  <input
    type="text"
    placeholder="Product Name"
    className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
    onChange={(e) =>
      setData({ ...data, name: e.target.value })
    }
  />

  <textarea
    placeholder="Description"
    className="w-full p-3 mb-4 rounded-lg h-24 bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
    onChange={(e) =>
      setData({ ...data, description: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Brand"
    className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
    onChange={(e) =>
      setData({ ...data, brand: e.target.value })
    }
  />

  <input
    type="number"
    step="0.01"
    placeholder="Price"
    className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
    onChange={(e) =>
      setData({ ...data, price: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Category"
    className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
    onChange={(e) =>
      setData({ ...data, category: e.target.value })
    }
  />

  <input
    type="date"
    className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
    onChange={(e) =>
      setData({ ...data, releaseDate: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Stock Quantity"
    className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
    onChange={(e) =>
      setData({ ...data, stockQuantity: e.target.value })
    }
  />

  <div className="text-white mb-4 flex items-center gap-2">
    <input
      type="checkbox"
      checked={data.availability}
      onChange={(e) =>
        setData({
          ...data,
          availability: e.target.checked
        })
      }
      className="w-4 h-4 accent-cyan-500"
    />
    <label className="text-gray-300">Available</label>
  </div>

  <input
    type="file"
    className="w-full p-3 mb-6 rounded-lg bg-slate-700 text-white file:bg-cyan-500 file:text-white file:px-4 file:py-2 file:rounded-lg"
    onChange={(e) => setImage(e.target.files[0])}
  />

  <button
    type="submit"
    className="
      bg-cyan-500
      hover:bg-cyan-600
      text-white
      w-full
      p-3
      rounded-xl
      font-bold
      transition
    "
  >
    Add Product
  </button>
</form>
      </div>
    </>
  );
}