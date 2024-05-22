import React from "react";
import CreateForm from "./_components/CreateForm";

const Dashboard = () => {
  return (
    <div className="px-10 py-7">
      <h2 className="font-bold text-2xl flex items-center justify-between">
        Dashboard Content
        <CreateForm />
      </h2>
    </div>
  );
};

export default Dashboard;
