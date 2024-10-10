import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineTextSnippet } from "react-icons/md";
import { VscSymbolString } from "react-icons/vsc";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { IoMdCheckboxOutline } from "react-icons/io";

const AddQuestion = ({ setQuestions, templateId, questions }) => {
  const addQuestion = async (type) => {
    try {
      const { data } = await axios.post("/api/questions", {
        title: "",
        description: "",
        type,
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
          type,
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
  };
  return (
    <>
      Click Icons below to add a question
      <div className="bg-white p-4 pt-8 rounded-md m-4 w-full max-w-lg border-t-4 border-blue-300 relative flex justify-center items-center gap-8">
        <div className="tooltip" data-tip="Text Area">
          <button className="btn" onClick={() => addQuestion("textarea")}>
            <MdOutlineTextSnippet />
          </button>
        </div>
        <div className="tooltip" data-tip="Text">
          <button className="btn" onClick={() => addQuestion("text")}>
            <VscSymbolString />
          </button>
        </div>
        <div className="tooltip" data-tip="Number">
          <button className="btn" onClick={() => addQuestion("number")}>
            <AiOutlineFieldNumber />
          </button>
        </div>
        <div className="tooltip" data-tip="Checkbox">
          <button className="btn" onClick={() => addQuestion("checkbox")}>
            <IoMdCheckboxOutline />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddQuestion;
