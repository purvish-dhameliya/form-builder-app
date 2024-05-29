import React from "react";
import dynamic from "next/dynamic";
const CreateForm = dynamic(() => import("./_components/CreateForm"));
const FormList = dynamic(() => import("./_components/FormList"));

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-between">
        <CreateForm />
      </h2>
      <FormList />
    </div>
  );
};

export default Dashboard;
