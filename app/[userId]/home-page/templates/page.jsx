import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import UserHomeF from "../../../components/UserHomeF";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { title } from "process";

const Page = async ({ params, searchParams }) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
    if (params.userId != decoded.id) {
      throw new Error("Invalid user");
    }
  } catch (err) {
    console.log(err);
    redirect("/");
  }
  if (searchParams.delete) {
    await sql`DELETE FROM templates WHERE id=${searchParams.delete}`;
  }
  const { sortBy, orderBy } = searchParams;

  const getSortBy = (sortBy) => {
    const dict = {
      id: "id",
      title: "lower(title)",
      createdat: "createdat",
      modifiedat: "modifiedat",
      topic: "lower(topic)",
    };
    return dict[sortBy];
  };

  // const query = `select * from templates where owner=${
  //   params.userId
  // } order by ${getSortBy(sortBy) || "id"} ${orderBy || "asc"}`;

  const query = `
    select * from 
    (
      select templates.id a_id,array_agg(tags.tag) tags
      from templates,tags,templates_tags
      where templates.id=templates_tags.template_id and tags.id=templates_tags.tag_id and owner=${
        params.userId
      }
      group by templates.id
    ) as a
    right join
    (
      select * from templates where owner=${params.userId}
    ) as b
    on a.a_id=b.id
    order by ${getSortBy(sortBy) || "id"} ${orderBy || "asc"}
  `;

  const { rows } = await sql.query(query);

  // console.log(rows);

  const Tags = ({ children }) => {
    return (
      <div className="flex flex-wrap gap-2">
        {children?.map((tag, index) => (
          <div className="badge badge-neutral" key={index}>
            {tag}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <UserHomeF userId={params.userId} />
      {rows.length > 0 ? (
        <table className="max-w-6xl mt-8 mb-8">
          <thead>
            <tr>
              <th className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                ID
              </th>
              <th className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                Title
              </th>
              <th className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                Created At
              </th>
              <th className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                Modified At
              </th>
              {/* <th className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                  Description
                </th> */}
              <th className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                Topic
              </th>
              <th className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                Tags
              </th>
              <th className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                Edit
              </th>
              <th className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((template, index) => (
              <tr key={index}>
                <td className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                  {template.id}
                </td>
                <td className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                  {template.title}
                </td>
                <td className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                  {template.createdat.toString().slice(4, 24)}
                </td>
                <td className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                  {template.modifiedat.toString().slice(4, 24)}
                </td>
                {/* <td className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                    {template.description}
                  </td> */}
                <td className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                  {template.topic}
                </td>
                <td className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                  <Tags>{template.tags}</Tags>
                </td>
                <td className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                  <Link
                    key={index}
                    href={`/${params.userId}/modify-template/${template.id}/settings`}
                    className="text-blue-500 underline flex justify-center w-full"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="bg-white p-2 border-2 border-gray-300 w-auto min-w-32">
                  <Link
                    key={index}
                    href={`templates?delete=${template.id}`}
                    className="text-red-500 underline flex justify-center w-full"
                  >
                    <FaTrash />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-32 bg-base-200 m-8 rounded-lg">
          No Templates Found
        </div>
      )}
    </div>
  );
};

export default Page;
