import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineDragIndicator } from "react-icons/md";
import { useState, useRef, useEffect } from "react";

const Question = ({
  children,
  setQuestions,
  index,
  mode,
  dragHandle,
  onDrag,
}) => {
  const [drag, setDrag] = useState(false);
  const { id, description, type, title } = children;
  // useEffect(() => {
  //   console.log(drag, mode === "edit" && drag);
  // }, [drag]);
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
        className="bg-base-300 rotate-90 rounded-md p-2 absolute top-0 right-1/2 translate-x-1/2 active:bg-base-200"
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
            disabled={mode === "edit"}
            type="checkbox"
            id={id}
            className="mb-2"
          />
        )}
        <div className="mb-2">{description}</div>
      </div>
      {((type === "text" || type === "number") && (
        <input
          disabled={mode === "edit"}
          className="border-b-2 border-gray-300 w-full focus:bg-base-200 focus:outline-none"
          id={id}
          type={type}
          placeholder={`Enter a ${type} here`}
        />
      )) ||
        (type === "textarea" && (
          <textarea
            disabled={mode === "edit"}
            className="border-b-2 border-gray-300 w-full focus:bg-base-200 focus:outline-none"
            id={id}
            placeholder={`Enter a multiline text here`}
          ></textarea>
        ))}
    </div>
  );
};

export default Question;
