"use client";

import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineDragIndicator } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Question = ({
  children,
  setQuestions,
  index,
  mode,
  dragHandle,
  onDrag,
  showToast,
}) => {
  const [drag, setDrag] = useState(false);
  const { id, description, type, title, form_id, question_id } = children;
  // useEffect(() => {
  //   console.log(drag, mode === "edit" && drag);
  // }, [drag]);
  useEffect(() => {
    // console.log(children);
    if (mode === "form" && showToast) {
      toast.info("You are in form mode. You can fill the form now.", {
        autoClose: false,
        position: "top-center",
      });
    }
    if (mode === "form") {
      document.getElementById(id).value =
        children.text || children.number || children.textarea;
      document.getElementById(id).checked = children.checkbox;
    }
  }, []);
  const saveHandler = async () => {
    try {
      const res = await axios.put("/api/answer", {
        questionId: question_id,
        formId: form_id,
        type: type,
        answers:
          type === "checkbox"
            ? document.getElementById(id).checked
            : document.getElementById(id).value,
      });
      toast.success("Answer saved successfully", { autoClose: 500 });
    } catch (err) {
      console.log(err);
      toast.error("Failed to save answer", { autoClose: 500 });
    }
  };
  return (
    <div
      className="bg-white p-4 pt-8 rounded-md m-4 w-full max-w-lg border-t-4 border-blue-300 relative"
      draggable={(mode === "edit" && drag) || false}
      onDragEnd={(e) => {
        dragHandle(e, index);
        setDrag(false);
      }}
      onDrag={onDrag}
    >
      <button
        disabled={mode !== "edit"}
        className="bg-base-300 rotate-90 rounded-md rounded-l-none p-2 absolute top-0 right-1/2 translate-x-1/2 active:bg-base-200"
        onMouseDown={() => setDrag(true)}
        onMouseUp={() => setDrag(false)}
      >
        <MdOutlineDragIndicator />
      </button>
      <button
        disabled={mode !== "edit"}
        className="p-1 pl-2 pr-2 bg-base-300 rounded-md absolute top-0 right-0 m-2"
        onClick={() => {
          setQuestions((question) => {
            const newQuestions = [...question];
            newQuestions[index] = { ...newQuestions[index], edit: true };
            return newQuestions;
          });
        }}
      >
        <HiDotsHorizontal />
      </button>
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <div className="flex gap-4">
        {type === "checkbox" && (
          <input
            disabled={mode !== "form"}
            type="checkbox"
            id={id}
            className="mb-2"
            onChange={saveHandler}
          />
        )}
        <div className="mb-2">{description}</div>
      </div>
      {((type === "text" || type === "number") && (
        <input
          disabled={mode !== "form"}
          className="border-b-2 border-gray-300 w-full focus:bg-base-200 focus:outline-none"
          id={id}
          type={type}
          placeholder={`Enter a ${type} here`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              saveHandler();
            }
          }}
        />
      )) ||
        (type === "textarea" && (
          <textarea
            disabled={mode !== "form"}
            className="border-b-2 border-gray-300 w-full focus:bg-base-200 focus:outline-none"
            id={id}
            placeholder={`Enter a multiline text here`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                saveHandler();
              }
            }}
          ></textarea>
        ))}
      {mode == "form" && type != "checkbox" && (
        <button className="btn btn-neutral mt-4" onClick={saveHandler}>
          Save
        </button>
      )}
    </div>
  );
};

export default Question;
