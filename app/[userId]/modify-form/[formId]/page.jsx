import { sql } from "@vercel/postgres";
import QuestionContainerServer from "../../../components/QuestionContainerServer";
import { Room } from "../../../Room";
import { CollaborativeApp } from "../../../CollaborativeApp";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const Page = async ({ params: { formId, userId } }) => {
  // console.log(formId, userId);
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const {
      rows: [{ template_id, owner }],
    } = await sql.query("select * from forms where id=$1", [formId]);
    const { rows } = await sql.query(
      `select questions.*,${formId} as form_id, answers.* from questions,answers where questions.template_id=${template_id} and answers.question_id=questions.id and answers.form_id=${formId} order by questions.index`
    );
    // console.log(rows);
    const {
      rows: [template],
    } = await sql.query(
      "select *,users1.username from templates,users1 where templates.id=$1 and templates.owner=users1.id",
      [template_id]
    );
    const { rows: tags } = await sql.query(
      `select * from tags,templates_tags,templates where templates_tags.template_id=templates.id and templates_tags.tag_id=tags.id and templates.id=${template_id}`
    );
    if (decoded.id != userId || decoded.id != owner) {
      throw new Error("Invalid user");
    }

    return (
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="w-full max-w-lg h-64 relative">
          <img
            className="w-full h-full object-cover"
            src={
              template?.image
                ? template.image
                : "https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png"
            }
            alt=""
          />
          {/* <CreateForm decoded={decoded} templateId={templateId} /> */}
        </div>
        <div className="w-full max-w-lg p-4 rounded-md border-t-4 border-yellow-500 flex flex-col items-center gap-2 bg-base-300">
          <h1 className="w-full max-w-lg text-start text-xl text-gray-500 font-bold border-b border-b-gray-500">
            {template?.username}
          </h1>
          <h1 className="w-full max-w-lg text-start text-3xl font-bold">
            {template?.title}
          </h1>
          <div className="flex flex-wrap gap-2 w-full max-w-lg">
            {tags?.length > 0 &&
              tags.map((tag, index) => (
                <div key={index} className="badge badge-neutral">
                  {tag.tag}
                </div>
              ))}
          </div>
          <h1 className="w-full max-w-lg text-start text-xl font-bold">
            {template?.topic}
          </h1>
          <div className="w-full max-w-lg">{template?.description}</div>
        </div>

        <QuestionContainerServer questions={rows} mode="form" />
      </div>
    );
  } catch (err) {
    console.log(err);
    // redirect("/");
  }
};

export default Page;
