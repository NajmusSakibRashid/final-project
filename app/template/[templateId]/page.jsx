import { sql } from "@vercel/postgres";
import QuestionContainerServer from "../../components/QuestionContainerServer";
import { Room } from "../../Room";
import { CollaborativeApp } from "../../CollaborativeApp";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import CreateForm from "../../components/CreateForm";

const Page = async ({ params: { templateId } }) => {
  const {
    rows: [template],
  } = await sql.query(
    "select templates.*,users1.username from templates,users1 where templates.owner=users1.id and templates.id = $1",
    [templateId]
  );
  // console.log(template);
  const { rows: tags } = await sql.query(
    "select tags.tag tag from tags,templates_tags,templates where templates_tags.template_id=templates.id and templates_tags.tag_id=tags.id and templates.id=10"
  );
  const { rows: questions } = await sql.query(
    "select * from questions where template_id = $1 order by index",
    [templateId]
  );
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? jwt.decode(token, process.env.JWT_SECRET) : null;
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
        <CreateForm decoded={decoded} templateId={templateId} />
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

      <QuestionContainerServer questions={questions} mode="show" />
      <Room roomId={templateId}>
        <CollaborativeApp />
      </Room>
    </div>
  );
};

export default Page;
