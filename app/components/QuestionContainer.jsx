import Question from "./Question";
import EditQuestion from "./EditQuestion";
import { useRef, useState } from "react";
import AddQuestion from "./AddQuestion";
import axios from "axios";

const QuestionContainer = ({ questions, setQuestions, mode, templateId }) => {
  const ref = useRef([]);
  const [indicator, setIndicator] = useState([]);
  const getIndex = (y) => {
    // console.log(ref.current[0].getBoundingClientRect());
    const index = ref.current.findIndex(
      (element) => y <= element.getBoundingClientRect().top
    );
    return index;
  };
  const dragHandle = (e, ind) => {
    // e.preventDefault();
    // console.log(getIndex(e.clientY));
    const index = getIndex(e.clientY);

    const putData = async (question, index) => {
      try {
        await axios.put(`/api/questions/${question.id}`, { index });
      } catch (err) {
        console.log(err);
        toast.error("Failed to update question", { autoClose: 500 });
      }
    };

    if (index != -1) {
      setQuestions((question) => {
        const newQuestions = [...question];
        const temp = newQuestions[ind];
        newQuestions.splice(ind, 1);
        newQuestions.splice(index, 0, temp);
        let new_index = 0;
        if (index == 0 && index == newQuestions.length - 1) new_index = 0;
        else if (index == 0) new_index = newQuestions[index + 1].index - 1;
        else if (index == newQuestions.length - 1)
          new_index = newQuestions[index - 1].index + 1;
        else
          new_index =
            (newQuestions[index - 1].index + newQuestions[index + 1].index) / 2;

        newQuestions[index].index = new_index;
        putData(newQuestions[index], new_index);

        return newQuestions;
      });
    }
    setIndicator([]);
  };
  const onDrag = (e) => {
    if (e.clientY + 10 > document.body.clientHeight) {
      document.body.scrollTop += 10;
    }
    if (e.clientY - 10 < 0) {
      document.body.scrollTop -= 10;
    }
    const index = getIndex(e.clientY);
    setIndicator((indicator) => {
      const newIndicator = [];
      newIndicator[index] = true;
      return newIndicator;
    });
  };
  return (
    <div className="w-full flex flex-col items-center mt-4">
      <div>
        <h1 className="text-2xl font-bold">Questions</h1>
      </div>
      {questions.map((question, index) => (
        <div
          key={index}
          className="w-full max-w-lg flex flex-col items-center"
          ref={(el) => (ref.current[index] = el)}
        >
          {indicator[index] && (
            <div className="border-b-4 border-blue-500 w-full"></div>
          )}
          {(question.edit && (
            <EditQuestion
              key={index}
              setQuestions={setQuestions}
              index={index}
              mode={mode}
              dragHandle={dragHandle}
              onDrag={onDrag}
              templateId={templateId}
            >
              {question}
            </EditQuestion>
          )) || (
            <Question
              key={index}
              setQuestions={setQuestions}
              index={index}
              mode={mode}
              dragHandle={dragHandle}
              onDrag={onDrag}
            >
              {question}
            </Question>
          )}
        </div>
      ))}
      <div
        key={questions.length}
        className="w-full max-w-lg flex flex-col items-center"
        // ref={(el) => (ref.current[questions.length] = el)}
      >
        {/* {indicator[questions.length] && (
          <div className="border-b-4 border-blue-500 w-full"></div>
        )} */}
        <AddQuestion
          setQuestions={setQuestions}
          templateId={templateId}
          questions={questions}
        />
      </div>
    </div>
  );
};

export default QuestionContainer;
