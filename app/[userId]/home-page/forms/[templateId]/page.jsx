import { sql } from "@vercel/postgres";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";

const Page = async ({ params: { userId, templateId } }) => {
  const { rows } =
    await sql`select questions.* from questions where questions.template_id = ${templateId} order by questions.index`;
  // console.log(rows);
  const { rows: answers } = await sql`
    select 
        forms.id f_id,
        users1.username,
        forms.date,
        array_agg(answers.text order by questions.index)  text,
        array_agg(answers.textarea order by questions.index)  textarea,
        array_agg(answers.checkbox order by questions.index)  checkbox,
        array_agg(answers.number order by questions.index)  number 
    from 
        answers 
    right join 
        questions 
    on 
        answers.question_id=questions.id 
    join 
        forms 
    on 
        questions.template_id=forms.template_id 
    join 
        users1
    on 
        users1.id=forms.owner
    where 
        forms.template_id=${templateId} and (answers.form_id=forms.id or answers.form_id is null) and users1.id=${userId}
    group by forms.id,users1.username,forms.date`;
  console.log(answers);
  const table = [
    [
      <th key={-2}>Owner</th>,
      <th key={-1}>Date</th>,
      ...rows.map((row, index) => <th key={index}>{row.title}</th>),
      <th key={rows.length}>Edit</th>,
    ],
    ...answers.map((answer, a_index) => [
      <td key={-2}>{answer.username}</td>,
      <td key={-1}>{answer.date.toString()}</td>,
      ...rows.map((question, q_index) => (
        <td key={q_index}>{answer[question.type][q_index]?.toString()}</td>
      )),
      <td key={rows.length}>
        <Link href={`../../modify-form/${answer.f_id}`}>
          <FaEdit />
        </Link>
      </td>,
    ]),
  ];
  return (
    <div>
      <table className="table bg-gray-300">
        <thead>
          <tr>{table[0]}</tr>
        </thead>
        <tbody>
          {table.slice(1).map((row, index) => (
            <tr key={index} className="hover">
              {row}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
