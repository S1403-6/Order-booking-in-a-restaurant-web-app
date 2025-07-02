import React from 'react';
import { useAppContext } from '../context/Appcontext';

const Login = ({ closeLogin }) => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setUser } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = state === "login"
      ? "http://localhost:5000/api/user/login"
      : "http://localhost:5000/api/user/register";
  
    const payload = state === "login"
      ? { email, password }
      : { name, email, password };
  
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // important for cookies
        body: JSON.stringify(payload)
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Login failed", errorText);
        alert("Login/Register failed: " + errorText);
        return;
      }
  
      const data = await res.json();
      if (data.success) {
        setUser(data.user); // Save user in context
        closeLogin(); // Close modal
      } else {
        alert(data.message || "Login/Register failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Check the console.");
    }
  };
  
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeLogin}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder=""
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder=""
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder=""
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-indigo-500 cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-indigo-500 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
