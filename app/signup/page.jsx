"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default () => {
  const [state, setState] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.username || !state.email || !state.password) {
      toast.error("Please fill all fields");
      return;
    }
    if (state.password !== state.cPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/api/signup", state);
      toast.success(response.data.message);
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      toast.error("Error signing up");
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-300 min-w-96">
      <div className="card bg-base-300 p-4">
        <h1 className="text-2xl">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              name="cPassword"
              type="password"
              placeholder="Password"
              className="input"
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary w-full mt-4">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
