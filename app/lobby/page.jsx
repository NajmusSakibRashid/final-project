import { sql } from "@vercel/postgres";
import TemplateHolder from "../components/TemplateHolder";

const Page = async () => {
  return (
    <div className="p-4">
      <h1 className="m-4 p-4 font-bold text-3xl bg-orange-300">
        Welcome to the Lobby, here are the latest templates
      </h1>
      <TemplateHolder>{`select templates.*,users1.username username from templates,users1 where templates.owner=users1.id order by createdat desc limit 5`}</TemplateHolder>
      <h1 className="m-4 p-4 font-bold text-3xl bg-orange-300">
        Welcome to the Lobby, here are the latest templates
      </h1>
      <TemplateHolder>{`select * from templates order by createdat desc limit 5`}</TemplateHolder>
    </div>
  );
};

export default Page;
