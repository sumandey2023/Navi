import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log("Login successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen app-bg flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight app-text">Navi</h1>
          <p className="mt-2 text-sm muted-text">
            Welcome back. Please sign in to continue.
          </p>
        </div>

        <div className="card-bg shadow-sm ring-1 border-app rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold app-text">Login</h2>
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium app-text"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-app card-bg px-3 py-2 app-text placeholder-gray-400 focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium app-text"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-app card-bg pr-20 px-3 py-2 app-text placeholder-gray-400 focus:outline-none focus:ring-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-2 my-auto h-8 px-2 text-sm font-medium text-primary bg-transparent rounded md:px-3"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center rounded-lg bg-primary bg-primary-hover px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              Login
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm muted-text">
          Don’t have an account?&nbsp;
          <Link to="/register" className="font-medium text-primary">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
