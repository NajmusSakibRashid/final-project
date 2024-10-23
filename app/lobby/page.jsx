import { sql } from "@vercel/postgres";
import TemplateHolder from "../components/TemplateHolder";
import Link from "next/link";

const Page = async () => {
  const { rows: tags } = await sql`select * from tags`;
  return (
    <div className="p-4">
      <h1 className="m-4 p-4 font-bold text-3xl bg-orange-300">
        Welcome to the Lobby, here are the latest templates
      </h1>
      <TemplateHolder>{`select templates.*,users1.username username from templates,users1 where templates.owner=users1.id order by createdat desc limit 5`}</TemplateHolder>
      <h1 className="m-4 p-4 font-bold text-3xl bg-orange-300">
        Welcome to the Lobby, here are the popular templates
      </h1>
      <TemplateHolder>
        {`
          select 
              *,count,users1.username username 
          from 
              templates 
          join
              users1
          on
              templates.owner=users1.id
          join 
              (
                  select 
                      templates.id t_id,count(*) 
                  from 
                      templates 
                  left join 
                      forms 
                  on 
                      templates.id=forms.template_id 
                  group by 
                      templates.id 
                  order by 
                      count(*) 
                  desc limit 5
              ) 
          on 
              templates.id=t_id 
          order by 
              count 
          desc
      `}
      </TemplateHolder>
      <h1 className="m-4 p-4 font-bold text-3xl bg-orange-300">
        Welcome to the Lobby, here are the tags
      </h1>
      <div className="m-4 flex flex-wrap gap-4">
        {tags.map((tag, index) => (
          <div key={index} className="badge badge-neutral cursor-pointer">
            <a href={`lobby/${tag.id}`}>{tag.tag}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
