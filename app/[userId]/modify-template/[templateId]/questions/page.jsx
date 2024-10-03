"use client";

import QuestionContainer from "../../../../components/QuestionContainer";
import { useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "",
      description: "",
      type: "text",
      edit: true,
    },
  ]);
  return (
    <div className="flex justify-center">
      <QuestionContainer
        questions={questions}
        setQuestions={setQuestions}
        mode="edit"
      />
    </div>
  );
};

export default Page;
