import { sql } from "@vercel/postgres";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { EmptyComponent } from "../../../components/EmptyComponent";

const Page = async ({ params: { userId, templateId } }) => {
  const { rows } = await sql`
      select distinct templates.*,users1.username from templates,forms,users1 where forms.owner=${userId} and forms.template_id=templates.id and users1.id=forms.owner    
    `;
  // console.log(rows);
  // console.log(answers);

  const headers = [
    <th key={1}>Id</th>,
    <th key={2}>Username</th>,
    <th key={3}>Title</th>,
    <th key={4}>Description</th>,
    <th key={5}>Topic</th>,
    <th key={6}>Forms</th>,
  ];

  if (rows.length == 0) {
    return (
      <EmptyComponent>{`You haven't submitted any forms yet.`}</EmptyComponent>
    );
  }

  return (
    <div>
      <div className="flex justify-center p-8">
        <h1 className="text-2xl font-bold">Templates you used</h1>
      </div>
      <table className="table bg-gray-300">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="hover">
              <td key={1}>{row.id}</td>
              <td key={2}>{row.username}</td>
              <td key={3}>{row.title}</td>
              <td key={4}>{row.description}</td>
              <td key={5}>{row.topic}</td>
              <td key={6}>
                <Link href={`forms/${row.id}`}>
                  <FaEdit />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
