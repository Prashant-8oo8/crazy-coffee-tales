import React, { useState } from 'react';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl p-10 border border-white/10 shadow-xl">
        
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-white">Sign in to your account</h2>

        {/* Subtitle */}
        <p className="mt-2 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="bg-gray-800 text-white border border-gray-600 focus:border-blue-400"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="bg-gray-800 text-white border border-gray-600 focus:border-blue-400"
            {...register("password", {
              required: true,
            })}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
