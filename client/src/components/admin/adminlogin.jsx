import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
      
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Error ${response.status}: ${text}`);
        }
      
        const data = await response.json();
        navigate("/admin/dashboard");
      } catch (err) {
        console.error("Login error:", err);
        alert("Login failed: " + err.message);
      }
      
  };
  
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto text-violet-600">Admin Login</p>

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder=""
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-violet-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-violet-500"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;