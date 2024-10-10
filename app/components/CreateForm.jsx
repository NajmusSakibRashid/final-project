"use client";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { toast } from "react-toastify";

const CreateForm = ({ decoded, templateId }) => {
  const createForm = async () => {
    try {
      const { data } = await axios.post("/api/create-form", {
        userId: decoded.id,
        templateId,
      });
      console.log(data);
      toast.success("Form created", { autoClose: 500 });
      setTimeout(() => {
        window.location.href = `/${decoded.id}/modify-form/${data.id}`;
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create form", { autoClose: 500 });
      // window.location.href = "/";
    }
  };
  return (
    <button
      className="btn btn-primary absolute bottom-0 right-0 m-4"
      disabled={!decoded}
      onClick={createForm}
    >
      Create Form
    </button>
  );
};

export default CreateForm;
