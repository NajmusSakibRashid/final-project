"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Page = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!state.email || !state.password) {
      toast.error("Please fill all fields", { autoClose: 500 });
      return;
    }
    try {
      const response = await axios.post("/api/signin", state);
      toast.success(response.data.message, { autoClose: 500 });
      setTimeout(
        () =>
          (window.location.href = `/${response.data.userId}/home-page/templates`),
        1000
      );
    } catch (error) {
      console.log(error);
      toast.error("Error signing in", { autoClose: 500 });
    }
  };
  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-300 min-w-96">
      <div className="card bg-base-300 p-4">
        <h1 className="text-2xl">Sign In</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            value={state.email}
            name="email"
            onChange={handleChange}
            type="text"
            placeholder="Email"
            className="input name='' onChange={handleChange}"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            value={state.password}
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="input name='' onChange={handleChange}"
          />
        </div>
        <button className="btn btn-primary w-full mt-4" onClick={handleSubmit}>
          Sign In
        </button>
        <div className="mt-4">
          {"Don't have an account?"}{" "}
          <Link href="/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
