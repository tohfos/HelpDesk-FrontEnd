import React from "react";

const Question = ({ question, userRole }) => {
  return (
    <div className="my-4">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            {question.Question}
              <div className="ml-5 badge badge-primary">{question.Category}</div>
              <div className="ml-5 badge badge-secondary">
                {question.SubCategory}
              </div>
          </div>
          <div className="collapse-content">
            <p>{question.Answer}</p>
          </div>
        </div>
    </div>
  );
};

export default Question;
