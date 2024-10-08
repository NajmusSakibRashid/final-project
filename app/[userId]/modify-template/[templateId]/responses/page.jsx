import { sql } from "@vercel/postgres";

const Page = async ({ params: { userId, templateId } }) => {
  const { rows } =
    await sql`select questions.* from questions where questions.template_id = ${templateId} order by questions.index`;
  // console.log(rows);
  const { rows: answers } = await sql.query(`
    select 
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
        forms.template_id=${templateId} and (answers.form_id=forms.id or answers.form_id is null)
    group by forms.id,users1.username,forms.date`);
  // console.log(answers);
  const table = [
    [
      <th key={-2}>Owner</th>,
      <th key={-1}>Date</th>,
      ...rows.map((row, index) => <th key={index}>{row.title}</th>),
    ],
    ...answers.map((answer, a_index) => [
      <td key={-2}>{answer.username}</td>,
      <td key={-1}>{answer.date.toString()}</td>,
      ...rows.map((question, q_index) => (
        <td key={q_index}>{answer[question.type][q_index]?.toString()}</td>
      )),
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
