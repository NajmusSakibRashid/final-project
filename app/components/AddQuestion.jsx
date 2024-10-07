import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

const AddQuestion = ({ setQuestions, templateId, questions }) => {
  return (
    <div className="bg-white p-4 pt-8 rounded-md m-4 w-full max-w-lg border-t-4 border-blue-300 relative flex justify-center items-center">
      <button
        className="btn"
        onClick={async () => {
          try {
            const { data } = await axios.post("/api/questions", {
              title: "",
              description: "",
              type: "text",
              edit: true,
              template_id: templateId,
              index: questions.length,
            });
            setQuestions((question) => {
              const newQuestions = [...question];
              newQuestions.push({
                id: data.question_id,
                title: "",
                description: "",
                type: "text",
                edit: true,
                template_id: templateId,
                index: questions.length,
              });
              return newQuestions;
            });
            toast.success("Question added", { autoClose: 500 });
          } catch {
            console.log(error);
            toast.error("Failed to add question", { autoClose: 500 });
          }
        }}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AddQuestion;
