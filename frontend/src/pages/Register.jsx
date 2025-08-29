import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api";
import { useTheme } from "../context/ThemeContext";

const Register = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", {
        fullName: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        email: formData.email,
        password: formData.password,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/register");
    }
  };
  return (
    <>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg right-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <svg
            className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
      <div className="min-h-screen app-bg flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight app-text">
                Navi
              </h1>
            </div>
            <p className="mt-2 text-sm muted-text">
              Create your account to get started.
            </p>
          </div>

          <div className="card-bg shadow-sm ring-1 border-app rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold app-text">Register</h2>
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium app-text"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    className="mt-2 w-full rounded-lg border border-app card-bg px-3 py-2 app-text placeholder-gray-400 focus:outline-none focus:ring-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium app-text"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="mt-2 w-full rounded-lg border border-app card-bg px-3 py-2 app-text placeholder-gray-400 focus:outline-none focus:ring-2"
                  />
                </div>
              </div>
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
                Register
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm muted-text">
            Already have an account?&nbsp;
            <Link to="/login" className="font-medium text-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
