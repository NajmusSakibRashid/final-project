import { sql } from "@vercel/postgres";
import QuestionContainerServer from "../../components/QuestionContainerServer";
import { Room } from "../../Room";
import { CollaborativeApp } from "../../CollaborativeApp";

const Page = async ({ params: { templateId } }) => {
  const {
    rows: [template],
  } = await sql.query("select * from templates where id = $1", [templateId]);
  const { rows: tags } = await sql.query(
    "select tags.tag tag from tags,templates_tags,templates where templates_tags.template_id=templates.id and templates_tags.tag_id=tags.id and templates.id=10"
  );
  const { rows: questions } = await sql.query(
    "select * from questions where template_id = $1 order by index",
    [templateId]
  );
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <img
        className="w-full max-w-lg h-64 object-cover"
        src={
          template.image
            ? template.image
            : "https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png"
        }
        alt=""
      />
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="w-full max-w-lg text-start text-3xl font-bold">
          {template.title}
        </h1>
        <h1 className="w-full max-w-lg text-start text-xl font-bold">
          {template.topic}
        </h1>
        <div className="flex flex-wrap gap-2 w-full max-w-lg">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <div key={index} className="badge badge-neutral">
                {tag.tag}
              </div>
            ))}
        </div>
      </div>
      <div className="w-full max-w-lg">{template.description}</div>
      <QuestionContainerServer questions={questions} mode="show" />
      <Room roomId={templateId}>
        <CollaborativeApp />
      </Room>
    </div>
  );
};

export default Page;
