import React from "react";

const Workflow = ({ workflow, userRole }) => {
  return (
    <div className="my-4">
      <div className="collapse bg-base-200">
      <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            {workflow.Description}
              <div className="ml-5 badge badge-primary">{workflow.Category}</div>
              <div className="ml-5 badge badge-secondary">
                {workflow.SubCategory}
              </div>
          </div>
        </div>
    </div>
  );
};

export default Workflow;
