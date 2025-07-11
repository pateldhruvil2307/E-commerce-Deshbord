import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error,seterror]=useState("");

  useEffect(()=>{
            const auth =localStorage.getItem("user")
            if(auth){
                navigate("/product")
                
            }
          })



  const handallogin = async () => {


    
if(!email || !password){
  seterror("Please fill all the fields");
  return;
}


const emailval = /\S+@\S+\.\S+/;
if(!emailval.test(email)){
  seterror("Please enter a valid email address");
  return
}
if( password.length < 5){
  seterror ("Password must be at least 6 characters");
  return;
}

seterror("")


    console.log(email, password);
    let result = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
    });
    result = await result.json();
    console.log("API result:", result);
   
   
  if (result.result === "no user found") {
    alert("No user found!");
  } else {
    alert("Login successful!");

    
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/product");
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Welcome Back!

          {error && (
          <div className="text-2xl text-red-300 mb-2">{error}</div>
        )}
        </h2>
        <form>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={handallogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
