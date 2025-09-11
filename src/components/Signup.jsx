import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="mx-auto w-full max-w-lg bg-gray-900 border border-gray-800 rounded-xl p-10 shadow-lg">
        
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-white">Sign up to create account</h2>

        {/* Subtitle */}
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 mt-6 text-center text-sm">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
            {...register("name", { required: true })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
            {...register("password", { required: true })}
          />

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
