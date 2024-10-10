"use server";

import Question from "./Question";

const QuestionContainer = ({ questions, mode }) => {
  return (
    <div className="w-full flex flex-col items-center mt-4">
      <div>
        <h1 className="text-2xl font-bold">Questions</h1>
      </div>
      {questions?.map((question, index) => (
        <div key={index} className="w-full max-w-lg flex flex-col items-center">
          <Question
            key={index}
            index={index}
            mode={mode}
            showToast={index === 0}
          >
            {question}
          </Question>
        </div>
      ))}
    </div>
  );
};

export default QuestionContainer;
