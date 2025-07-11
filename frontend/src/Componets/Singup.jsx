import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Singup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/product");
    }
  }, [navigate]);

  const collectdata = async () => {
    // Validation
    if (!name || !email || !password) {
      seterror("Please fill all the fields");
      return;
    }

    const emailval = /\S+@\S+\.\S+/;
    if (!emailval.test(email)) {
      seterror("Please enter a valid email address");
      return;
    }

    
    if (password.length < 6) {
      seterror("Password must be at least 6 characters");
      return;
    }

    seterror(""); 

    let result = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    result = await result.json();
    console.log("API result:", result);

    localStorage.setItem("user", JSON.stringify(result));
    navigate("/product");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create Account
        </h2>

        {error && (
          <div className="text-2xl text-red-300 mb-2">{error}</div>
        )}

        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
          value={name}
          className="w-full px-4 py-3 mb-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
          className="w-full px-4 py-3 mb-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          className="w-full px-4 py-3 mb-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
          onClick={collectdata}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Singup;
