import { FaPlus } from "react-icons/fa6";

const AddQuestion = ({ setQuestions }) => {
  return (
    <div className="bg-white p-4 pt-8 rounded-md m-4 w-full max-w-lg border-t-4 border-blue-300 relative flex justify-center items-center">
      <button
        className="btn"
        onClick={() => {
          setQuestions((question) => {
            const newQuestions = [...question];
            newQuestions.push({
              title: "",
              description: "",
              type: "text",
              edit: true,
            });
            return newQuestions;
          });
        }}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AddQuestion;
