"use client";

import QuestionContainer from "../../../../components/QuestionContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = ({ params }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await axios.get(`/api/questions/${params.templateId}`);
        setQuestions(data.rows);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="flex justify-center">
      <QuestionContainer
        templateId={params.templateId}
        questions={questions}
        setQuestions={setQuestions}
        mode="edit"
      />
    </div>
  );
};

export default Page;
