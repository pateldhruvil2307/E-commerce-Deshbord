import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/product")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  const deleteproduct = async (id) => {
    let result = await fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE"
    });

    result = await result.json();
    if (result) {
      alert("Product deleted successfully");
      setProducts((prev) => prev.filter(item => item._id !== id));
    }
  };

  // search products

  const searchhendle  =async(e)=>{
    let key = e.target.value
    if(key){
let result =await fetch(`http://localhost:3000/search/${key}`);
    result = await  result.json();
    if(result){
      setProducts(result)
    } 
  
    }
    

  }

  return (
    <>
<div className="p-4 sm:px-6 md:px-10 lg:px-20 mt-10">
  <input
    type="text"
    onChange={searchhendle}
    placeholder="Search product"
    className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
  />
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 sm:p-6 md:p-10">
  {products.length > 0 ? (
    products.map((item) => (
      <div key={item._id} className="bg-white rounded-2xl shadow-lg p-5 transition-transform hover:scale-105 duration-300">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover mb-4 rounded-lg"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{item.name}</h3>
        <p className="text-gray-500 text-sm mb-1">Brand: {item.brand}</p>
        <p className="text-gray-900 font-bold text-base mb-4">₹ {item.price}</p>

        <div className="flex flex-wrap gap-2">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Buy Now
          </button>
          <button
            onClick={() => deleteproduct(item._id)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
          <Link
            to={`/product/${item._id}`}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-center transition"
          >
            Update
          </Link>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center py-8">
      <h2 className="inline-block bg-amber-950 text-amber-50 px-6 py-3 rounded-lg shadow-md text-sm uppercase tracking-wide">
        No result found
      </h2>
    </div>
  )}
</div>

    </>
  );
};

export default Products;
