import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Question from "../../../components/Question/Question";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Workflow from "../../../components/WorkFlow/WorkFlow";
import Fuse from "fuse.js";

const Index = () => {
  //I will get all the questions first and save them in all question api
  //after that when trying to get the filtered question based on the selection I have made I will call the respective api for it
  //adn then say bismallah

  const [Knowledgebase, setKnowledgebase] = useState({
    Category: "",
    SubCategory: "",
    Question: "",
    Answer: "",
    Description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [quillText, setQuillText] = useState("");
  const [allWorkflows, setAllWorkflows] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState([]);

  const fuseOptions = {
    keys: ["Question"],
    threshold: 0.4, // Set your desired threshold here
  };

  const fuse = new Fuse(allQuestions, fuseOptions);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const user = jwtDecode(Cookies.get("token"));

  const handleknoledgeChange = (e) => {
    const { name, value } = e.target;

    // Check if the changed field is the category
    if (name === "Category") {
      // Reset the subcategory when the category changes
      setKnowledgebase((prevKnowledgebase) => ({
        ...prevKnowledgebase,
        [name]: value,
        SubCategory: "", // Reset subcategory to empty string or null
      }));
    } else {
      // For other fields, update normally
      setKnowledgebase((prevKnowledgebase) => ({
        ...prevKnowledgebase,
        [name]: value,
      }));
    }
    if (name === "Question" || name === "Answer" || name === "Description") {
      handleSearch(value);
    }
  };

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);

    const filterFunction =
      user.UserInfo.role === "User" || user.UserInfo.role === "Manager"
        ? filterUserQuestions
        : filterAdminQuestions;

    if (searchTerm === "") {
      // If no search term, reset to all questions
      setQuestions(allQuestions.filter(filterFunction));
      setFilteredQuestions([]);
    } else {
      // If there is a search term, use Fuse to filter the questions
      const result = fuse.search(searchTerm);

      if (Knowledgebase.Category === "" && Knowledgebase.SubCategory === "") {
        // If no category or subcategory is selected, update all questions
        setQuestions(result.map(({ item }) => item).filter(filterFunction));
        setFilteredQuestions([]);
      } else {
        // If a category or subcategory is selected, update filtered questions
        setFilteredQuestions(
          result.map(({ item }) => item).filter(filterFunction)
        );
        setQuestions([]);
      }
    }
  };

  // Helper function to filter questions for the "User" role
  const filterUserQuestions = (question) => {
    return (
      (user.UserInfo.role === "User" || user.UserInfo.role === "Manager") &&
      question.Answer !== undefined
    );
  };

  // Helper function to filter questions for the "User" role
  const filterAdminQuestions = (question) => {
    return (
      user.UserInfo.role === "Admin" &&
      question.Question !== undefined &&
      question.Description === null
    );
  };
  // Helper function to check if the "Add" button should be enabled
  const isAddButtonDisabled = () => {
    if (user.UserInfo.role === "User" || user.UserInfo.role === "Manager") {
      return !Knowledgebase.Question.trim();
    } else if (user.UserInfo.role === "Admin") {
      return !(Knowledgebase.Question.trim() && Knowledgebase.Answer.trim());
    } else if (user.UserInfo.role === "Agent") {
      return !quillText.trim();
    }
  };

  useEffect(() => {
    handleGetQuestions();
    handleGetWorkflows();
  }, []);

  useEffect(() => {
    handleFiltredQuestion();
    handleFilteredWorkflow(); // Filter workflows when Category or SubCategory changes
  }, [Knowledgebase.Category, Knowledgebase.SubCategory]);

  const convertHtmlToPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  //   To handle Agent adding
  const Handleknoledgebutton = async (e) => {
    e.preventDefault();
    console.log("123", Knowledgebase);

    console.log(user);
    if (user.UserInfo.role === "User" || user.UserInfo.role === "Manager") {
      try {
        console.log(Knowledgebase);
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
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // Handle success, maybe redirect or show a success message
          console.log("Question posted successfully");
          success("Question posted successfully", response.message);
        } else {
          // Handle error, maybe show an error message
          console.error("Failed to Add question");
          fail("Failed to Add question", response.message);
        }
      } catch (error) {
        console.error("Failed to Add question");
        fail("Failed to Add question", error.message);
      }
    } else if (user.UserInfo.role === "Admin") {
      try {
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
      } catch (error) {
        console.error("Failed to Add knoledgebase");
        fail("Failed to Add knowledgebase", error.message);
      }
    } else if (user.UserInfo.role === "Agent") {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_EXPRESS_URL}/api/v1/agent/addWorkFlow`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + Cookies.get("token"),
            },
            body: JSON.stringify({
              ...Knowledgebase,
              Description: convertHtmlToPlainText(quillText),
            }),
            credentials: "include",
          }
        );
        if (response.ok) {
          // Handle success, maybe redirect or show a success message
          console.log("Workflow added successfully");
          success("WorkFlow Added successfully", response.message);
        } else {
          // Handle error, maybe show an error message
          console.error("Failed to Add workflow");
          fail("Failed to Add workflow", response.message);
        }
      } catch (error) {
        console.error("Failed to Add workflow");
        fail("Failed to Add workflow", error.message);
      }
    }
    if (Knowledgebase.Category === "") {
      if (user.UserInfo.role !== "Agent") handleGetQuestions();
      else handleGetWorkflows();
    } else {
      if (user.UserInfo.role !== "Agent") handleFiltredQuestion();
      else handleFilteredWorkflow();
    }
  };

  const handleGetQuestions = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/KnowledgeBase`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        credentials: "include",
      }
    );
    const data = await response.json();

    // If user role is "User," filter questions to show only those with answers
    let filteredQuestions;
    if (user.UserInfo.role === "User") {
      filteredQuestions = data.filter(
        (question) => question.Answer !== undefined
      );
    } else {
      // If the user has any other role, show all questions
      filteredQuestions = data;
    }

    setAllQuestions(data);
    setQuestions(filteredQuestions);
  };

  const handleFiltredQuestion = async () => {
    if (Knowledgebase.Category !== "") {
      try {
        let apiUrl = `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/KnowledgeBase/${Knowledgebase.Category}`;

        if (Knowledgebase.SubCategory !== "") {
          apiUrl += `/${Knowledgebase.SubCategory}`;
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data:", data);
          let filteredQuestions;

          if (user.UserInfo.role === "User") {
            filteredQuestions = data.filter(
              (question) => question.Answer !== undefined
            );
          } else {
            filteredQuestions = data;
          }

          setFilteredQuestions(filteredQuestions);
        } else {
          console.error("Failed to fetch filtered questions");
        }
      } catch (error) {
        console.error("Error fetching filtered questions", error);
      }
    } else {
      // If no category is selected, fetch all questions
      handleGetQuestions();
    }
  };

  const handleGetWorkflows = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/KnowledgeBase`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        credentials: "include",
      }
    );
    const data = await response.json();

    // If user role is "User," filter questions to show only those with answers
    let filteredWorkflows;

    filteredWorkflows = data.filter(
      (workflow) => workflow.Description !== undefined
    );

    setAllWorkflows(data);
    setWorkflows(filteredWorkflows);
  };

  const handleFilteredWorkflow = async () => {
    if (Knowledgebase.Category !== "") {
      try {
        let apiUrl = `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/KnowledgeBase/${Knowledgebase.Category}`;

        if (Knowledgebase.SubCategory !== "") {
          apiUrl += `/${Knowledgebase.SubCategory}`;
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data:", data);
          let filteredWorkflows;

          filteredWorkflows = data.filter(
            (workflow) => workflow.Description !== undefined
          );

          setFilteredWorkflows(filteredWorkflows);
        } else {
          console.error("Failed to fetch filtered workflows");
        }
      } catch (error) {
        console.error("Error fetching filtered workflows", error);
      }
    } else {
      // If no category is selected, fetch all workflows
      handleGetWorkflows();
    }
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
    <div className="flex flex-col h-screen w-full py-12 overflow-y-auto bg-base-100">
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col space-y-1 md:p-5">
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
          <div className="flex flex-col space-y-1 md:p-5">
            <label
              htmlFor="SubCategory"
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

        {Knowledgebase.Category === "Hardware" && (
          <div className="flex flex-col space-y-1 md:p-5">
            <label
              htmlFor="SubCategory"
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
              <option value="Desktop">Desktop</option>
              <option value="Laptops">Laptops</option>
              <option value="Printers">Printers</option>
              <option value="Servers">Servers</option>
              <option value="Networking Equipment">Networking Equipment</option>
            </select>
          </div>
        )}

        {Knowledgebase.Category === "Network" && (
          <div className="flex flex-col space-y-1 md:p-5">
            <label
              htmlFor="SubCategory"
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
              <option value="Email Issues">Email Issues</option>
              <option value="Internet Connection Problems">
                Internet Connection Problems
              </option>
              <option value="Website Error">Website Error</option>
            </select>
          </div>
        )}

        {user.UserInfo.role === "User" ||
        user.UserInfo.role === "Admin" ||
        user.UserInfo.role === "Manager" ? (
          <div className="flex flex-col space-y-1 md:p-5">
            <div className="label">
              <label
                htmlFor="question"
                className="text-sm font-medium text-base-content"
              >
                Question
              </label>
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
        ) : null}

        {user.UserInfo.role === "Admin" ? (
          <>
            <div className="flex flex-col space-y-1 md:p-5">
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
            <div className="flex flex-col space-y-1 ml-5 md:p-5">
              <label
                htmlFor="Description"
                className="text-sm font-medium text-base-content"
              >
                Workflow
              </label>
              <ReactQuill
                value={quillText}
                onChange={(value) => setQuillText(value)}
                modules={modules}
                formats={formats}
                className="quill h-44"
                placeholder="Type your workflow here..."
              />
            </div>
          </>
        ) : null}

        {Knowledgebase.Category !== "" && Knowledgebase.SubCategory !== "" ? (
          <div className="flex flex-col form-control p-5 md:p-14">
            <button
              type="submit"
              className="btn btn-primary btn-wide md:w-full lg:w-auto shadow-md"
              onClick={Handleknoledgebutton}
              disabled={isAddButtonDisabled()}
            >
              Add
            </button>
          </div>
        ) : (
          <div className="flex flex-col form-control p-5 md:p-14">
            <button
              type="submit"
              className="btn btn-primary btn-wide md:w-full lg:w-auto shadow-md"
              onClick={Handleknoledgebutton}
              disabled="disabled"
            >
              Add
            </button>
          </div>
        )}
      </div>
      {Knowledgebase.Category !== "" ? (
        <div className="ml-5 space-y-4 my-24">
          {user.UserInfo.role === "User" ||
          user.UserInfo.role === "Admin" ||
          user.UserInfo.role === "Manager"
            ? filteredQuestions.map((question) => (
                <Question
                  key={question._id}
                  question={question}
                  userRole={user.UserInfo.role}
                />
              ))
            : null}
          <div className="ml-5 space-y-4 my-24">
            {user.UserInfo.role === "Agent" &&
              filteredWorkflows.map((workflow) => (
                <Workflow
                  key={workflow._id}
                  workflow={workflow}
                  userRole={user.UserInfo.role}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="ml-5 space-y-4 my-24">
          {user.UserInfo.role === "User" ||
          user.UserInfo.role === "Admin" ||
          user.UserInfo.role === "Manager"
            ? questions.map((question) => (
                <Question
                  key={question._id}
                  question={question}
                  userRole={user.UserInfo.role}
                />
              ))
            : null}
          <div className="ml-5 space-y-4 my-24">
            {user.UserInfo.role === "Agent" &&
              workflows.map((workflow) => (
                <Workflow
                  key={workflow._id}
                  workflow={workflow}
                  userRole={user.UserInfo.role}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
