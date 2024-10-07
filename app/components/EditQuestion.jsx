import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineDragIndicator } from "react-icons/md";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const EditQuestion = ({
  children,
  setQuestions,
  index,
  mode,
  dragHandle,
  onDrag,
  templateId,
}) => {
  const [drag, setDrag] = useState(false);
  const { id, title, description, type } = children;
  const handleChange = (e) => {
    setQuestions((question) => {
      const newQuestions = [...question];
      newQuestions[index] = {
        ...newQuestions[index],
        [e.target.name]: e.target.value,
      };
      return newQuestions;
    });
  };
  const deleteHandler = () => {
    try {
      const deleteData = async () => {
        await axios.delete(`/api/questions/${children.id}`);
      };
      deleteData();
      toast.success("Question deleted", { autoClose: 500 });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete question", { autoClose: 500 });
    }
  };
  return (
    <div
      className="bg-white p-4 pt-9 rounded-md m-4 w-full max-w-lg border-t-4 border-blue-300 relative"
      draggable={(mode === "edit" && drag) || false}
      onDragEnd={(e) => {
        dragHandle(e, index);
        setDrag(false);
      }}
      onDrag={onDrag}
    >
      <button
        className="bg-base-300 rotate-90 rounded-md rounded-l-none p-2 absolute top-0 right-1/2 translate-x-1/2 active:bg-base-200"
        onMouseDown={() => setDrag(true)}
        onMouseUp={() => setDrag(false)}
      >
        <MdOutlineDragIndicator />
      </button>
      <button
        className="p-1 pl-2 pr-2 bg-base-300 rounded-md absolute top-0 right-0 m-2"
        onClick={() => {
          try {
            const putData = async (question) => {
              await axios.put("/api/questions", question);
            };
            setQuestions((question) => {
              const newQuestions = [...question];
              newQuestions[index] = { ...newQuestions[index], edit: false };
              putData(newQuestions[index]);
              return newQuestions;
            });
            toast.success("Question saved", { autoClose: 500 });
          } catch (error) {
            console.log(error);
            toast.error("Failed to save question", { autoClose: 500 });
          }
        }}
      >
        <HiDotsHorizontal />
      </button>
      <div className="mb-2 flex justify-between w-full items-center">
        <label htmlFor="title">Title</label>
        <input
          className="w-full max-w-64 p-2 border-b border-gray-300 rounded-md focus:bg-base-300 focus:outline-none"
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          defaultValue={title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2 flex justify-between w-full items-center">
        <label htmlFor="description">Description</label>
        <input
          className="w-full max-w-64 p-2 border-b border-gray-300 rounded-md focus:bg-base-300 focus:outline-none"
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          defaultValue={description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2 flex justify-between w-full items-center">
        <label htmlFor="type">Type</label>
        <select
          className="w-full max-w-64 p-2 border-b border-gray-300 rounded-md focus:bg-base-300 focus:outline-none"
          id="type"
          name="type"
          defaultValue={type}
          onChange={handleChange}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="textarea">Textarea</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="btn btn-warning"
          onClick={() => {
            deleteHandler();
            setQuestions((question) => {
              const newQuestions = [...question];
              newQuestions.splice(index, 1);
              return newQuestions;
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditQuestion;
