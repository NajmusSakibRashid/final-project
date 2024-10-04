"use client";
import axios from "axios";
import { toast } from "react-toastify";

const UserHomeF = ({ userId }) => {
  const createTemplate = async () => {
    try {
      const response = await axios.post("/api/template", { userId });
      toast.success(response.data.message, { autoClose: 500 });
      window.location.href = `/${userId}/modify-template/${response.data.templateId}/settings`;
    } catch (err) {
      // console.log(err);
      toast.error("Error creating template", { autoClose: 500 });
    }
  };
  return (
    <div className="flex">
      <button
        onClick={createTemplate}
        className="p-4 bg-yellow-100 rounded-2xl rounded-r-none m-px mt-4 min-w-44 text-center active:bg-yellow-200"
      >
        Create Template
      </button>
      <button className="p-4 bg-yellow-100 rounded-2xl rounded-l-none m-px mt-4 min-w-44 text-center active:bg-yellow-200">
        Sort by
      </button>
    </div>
  );
};

export default UserHomeF;
