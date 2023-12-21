import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Index = () => {
  const [Knowledgebase, setKnowledgebase] = useState({
    category: "",
    subcategory: "",
    Question: "",
    Answer: "",
    Description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [questions, setQuestions] = useState([]);

  const user = jwtDecode(Cookies.get("token"));

  const handleknoledgeChange = (e) => {
    setKnowledgebase({
      ...Knowledgebase,
      [e.target.name]: e.target.value,
    });
    console.log(Knowledgebase);
  };

  useEffect(() => {handleGetQuestions()}, []);

  //   To handle Agent adding
  const Handleknoledgebutton = async (e) => {
    e.preventDefault();
    console.log("123", Knowledgebase);

    if (user.UserInfo.role === "Admin") {
      const response = await fetch(
        `${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/AddDataToKnowledgeBase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
          body: JSON.stringify(Knowledgebase),
          credentials: "include",
        }
      );
      if (response.ok) {
        // Handle success, maybe redirect or show a success message
        console.log("knoledgebase Added successfully");
        success("knowledgebase Added successfully", response.message);
      } else {
        // Handle error, maybe show an error message
        console.error("Failed to Add knoledgebase");
        fail("Failed to Add knowledgebase", response.message);
      }
    } else if (user.UserInfo.Role === "User") {
      const response = await fetch(
        `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/postQuestion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
          body: JSON.stringify(Knowledgebase),
          credentials: "include",
        }
      );
      if (response.ok) {
        // Handle success, maybe redirect or show a success message
        console.log("Question Posted successfully");
        success("Question posted successfully", response.message);
      } else {
        // Handle error, maybe show an error message
        console.error("Failed to post question");
        fail("Failed to post question", response.message);
      }
    }
    //window.location.reload();
  };

  const handleGetQuestions = async () => {

    console.log("456", Knowledgebase);

    const response = await fetch(
        `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/KnowledgeBase`,
        {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + Cookies.get("token")
            },
            credentials : "include"
        }
    )
    const data = await response.json()


    // If user role is "User," filter questions to show only those with answers
    let filteredQuestions;
    if (user.UserInfo.role === "User") {
        filteredQuestions = data.filter((question) => question.Answer !== "");
    } else {
        // If the user has any other role, show all questions
        filteredQuestions = data;
    }
    
    setQuestions(filteredQuestions);
    console.log("questions", filteredQuestions)

    // if (Knowledgebase.category === "" && Knowledgebase.subcategory === "") {
    //   const response = await fetch(
    //     `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/KnowledgeBase`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + Cookies.get("token"),
    //       },
    //       credentials: "include",
    //     }
    //   );
    //   if (response.ok) {
    //     // make logic to show questions that match the search bar item or similarities
    //   }
    // } else if (
    //   Knowledgebase.category !== "" &&
    //   Knowledgebase.subcategory === ""
    // ) {
    //   const response = await fetch(
    //     `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/KnowledgeBase/${Knowledgebase.category}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + Cookies.get("token"),
    //       },
    //       credentials: "include",
    //     }
    //   );
    //   if (response.ok) {
    //     // make logic to show questions that match the search bar item or similarities
    //   }
    // } else {
    //   const response = await fetch(
    //     `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/KnowledgeBase/${Knowledgebase.category}/${Knowledgebase.subcategory}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + Cookies.get("token"),
    //       },
    //       credentials: "include",
    //     }
    //   );
    //   if (response.ok) {
    //     // make logic to show questions that match the search bar item or similarities
    //   }
    // }
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
    <div
      className="hero flex min-h-screen justify-center py-12 overflow-visible bg-base-100"
      style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}
    >
      <div className="flex flex-col space-y-4 max-w-lg mx-auto">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="Category"
            className="text-sm font-medium text-base-content"
          >
            Category
          </label>
          <select
            required
            onChange={handleknoledgeChange}
            name="Category"
            id="Category"
            className="select select-bordered w-full"
          >
            <option selected disabled value="Select">
              Select
            </option>
            <option value="Software">Software Issue</option>
            <option value="Hardware">Hardware Issue</option>
            <option value="Network">Network Issue</option>
          </select>
        </div>

        {Knowledgebase.Category === "Software" && (
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="subcategory"
              className="text-sm font-medium text-base-content"
            >
              Subcategory
            </label>
            <select
              required
              onChange={handleknoledgeChange}
              name="SubCategory"
              id="SubCategory"
              className="select select-bordered w-full"
            >
              <option selected disabled value="Select">
                Select
              </option>
              <option value="Operating System">Operating System</option>
              <option value="Application Software">Application Software</option>
              <option value="Custom Software">Custom Software</option>
              <option value="Integration Issues">Integration Issues</option>
            </select>
          </div>
        )}

        {Knowledgebase.category === "Hardware" && (
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="subcategory"
              className="text-sm font-medium text-base-content"
            >
              Subcategory
            </label>
            <select
              required
              onChange={handleknoledgeChange}
              name="subcategory"
              id="subcategory"
              className="select select-bordered w-full"
            >
              <option selected disabled value="Select">
                Select
              </option>
              <option value="Desktop">Desktop</option>
              <option value="Laptops">Laptops</option>
              <option value="Printers">Printers</option>
              <option value="Servers">Servers</option>
              <option value="Networking Equipment">Networking Equipment</option>
            </select>
          </div>
        )}

        {Knowledgebase.category === "Network" && (
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="subcategory"
              className="text-sm font-medium text-base-content"
            >
              Subcategory
            </label>
            <select
              required
              onChange={handleknoledgeChange}
              name="subcategory"
              id="subcategory"
              className="select select-bordered w-full"
            >
              <option selected disabled value="Select">
                Select
              </option>
              <option value="Email Issues">Email Issues</option>
              <option value="Internet Connection Problems">
                Internet Connection Problems
              </option>
              <option value="Website Error">Website Error</option>
            </select>
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <div className="label">
            <label
              htmlFor="question"
              className="text-sm font-medium text-base-content"
            >
              Question
            </label>
            {user.UserInfo.role === "User" ? (
              <span className="label-text-alt">
                <button className="btn btn-circle btn-ghost">
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
            ) : null}
          </div>

          <input
            required
            onChange={handleknoledgeChange}
            name="Question"
            id="Question"
            type="text"
            className="input input-bordered w-full"
            placeholder="Question"
          />
        </div>

        {user.UserInfo.role === "Admin" ? (
          <>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="Answer"
                className="text-sm font-medium text-base-content"
              >
                Answer
              </label>
              <input
                required
                onChange={handleknoledgeChange}
                name="Answer"
                id="Answer"
                type="text"
                className="input input-bordered w-full"
                placeholder="Answer"
              />
            </div>
          </>
        ) : null}
        {user.UserInfo.role === "Agent" ? (
          <>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="Description"
                className="text-sm font-medium text-base-content"
              >
                Description
              </label>
              <input
                required
                onChange={handleknoledgeChange}
                name="Description"
                id="Description"
                type="text"
                className="input input-bordered w-full"
                placeholder="Description"
              />
            </div>
          </>
        ) : null}

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary btn-wide shadow-md"
            onClick={Handleknoledgebutton}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
