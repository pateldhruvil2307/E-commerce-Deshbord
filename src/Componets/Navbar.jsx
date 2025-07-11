import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
   const auth=localStorage.getItem("user")

   const logout=()=>{
    localStorage.clear()
    navigate("/signup")

   }
  return (
    <>
   
    
      <nav className="bg-blue-950 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            MyApp
          </div>
            {
      auth ?
          <ul className="flex space-x-6">
            <li>
              <Link to="/product" className="hover:text-yellow-300">
                Product
              </Link>
            </li>
            <li>
              <Link to="/addproduct" className="hover:text-yellow-300">
                Addproduct
              </Link>
            </li>
            {/* <li>
              <Link to="/product/:id" className="hover:text-yellow-300">
                UpdateProduct
              </Link>
            </li> */}
            
            <li>
              <Link to="/profile" className="hover:text-yellow-300">
                Profile
              </Link>
            </li>
           <li>
              <Link onClick={logout}   to="/signup" className="hover:text-yellow-300">
                Logout (  {JSON.parse(auth).name} )  
              </Link>
            </li> 
            </ul>
              :
             <> <ul className="flex space-x-6"><li> <Link  to="/signup" className="hover:text-yellow-300">Signup</Link></li>  
             <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>    </ul>
</>            }
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
