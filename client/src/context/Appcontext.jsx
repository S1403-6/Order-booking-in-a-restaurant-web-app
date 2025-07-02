import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [seller, isseller] = useState(false);
  const [ShowUserLogin, setShowUserLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prev) => [...prev, { ...product, quantity }]);
  };

  const addToCartWithQuantity = (product, quantity) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    alert(`You have ordered ${quantity} of ${product.name}`);
  };

  const products = [
    { name: "Pizza", image: assets.pizza, price: 250 },
    { name: "Spaghetti", image: assets.spaghetti, price: 230 },
    { name: "Penne", image: assets.penne, price: 220 },
    { name: "Dosa", image: assets.dosa, price: 80 },
    { name: "Noodles", image: assets.noodles, price: 120 },
  ];

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/api/user/is-auth", {
  //         credentials: "include",
  //       });
  //       const data = await res.json();
  //       if (data.success) {
  //         setUser(data.user);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (err) {
  //       console.error("Auth error:", err);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Skipping fetch temporarily...");
      setUser(null);
      setLoading(false);
    };
    fetchUser();
  }, []);
  
  
  
  const value = {
    navigate,
    user,
    setUser,
    seller,
    isseller,
    ShowUserLogin,
    setShowUserLogin,
    products,
    cart,
    setCart,
    addToCart,
    searchTerm,
    setSearchTerm,
    addToCartWithQuantity,
    loading, 
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
