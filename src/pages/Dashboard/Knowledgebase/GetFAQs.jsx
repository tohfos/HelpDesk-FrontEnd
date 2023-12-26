import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const GetFAQs = () => {
  const [searchItem, setSearchItem] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchItem(value);
  };

  const handleFetchSuggestions = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/KnowledgeBase/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission
  };

  const fail = (alert) => {
    toast.error(alert, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const success = (alert) => {
    toast.success(alert, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="hero flex min-h-screen justify-center py-12 overflow-visible bg-base-100">
      <div className="form-control">
        <div className="input-group">
          <div className="label">
            <span className="label-text">Pick the category</span>
          </div>
          <select className="select select-ghost select-xs w-full max-w-xs">
            <option disabled selected>
              Enter Category
            </option>
            <option>T-shirts</option>
            <option>Mugs</option>
          </select>
          <div className="label">
            <span className="label-text">Pick the sub-category</span>
          </div>
          <select className="select select-ghost select-xs w-full max-w-xs">
            <option disabled selected>
              Pick sub-category
            </option>
            <option>T-shirts</option>
            <option>Mugs</option>
          </select>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is your question?</span>
              <span className="label-text-alt">
                <button className="btn btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <input
              type="text"
              placeholder="Enter your question here"
              className="input input-bordered w-full max-w-xs"
              value={searchItem}
              onChange={handleChange}
              list="suggestions"
            />
            <datalist id="suggestions">
              {suggestions.map((suggestion, index) => (
                <option key={index} value={suggestion.Question} />
              ))}
            </datalist>
          </label>
        </div>
      </div>
    </div>
  );
};

export default GetFAQs;
