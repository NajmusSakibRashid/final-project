import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request, { params }) {
  const { searchText } = params;
  const { rows } = await sql.query(`
    select templates.id,templates.title from templates where id in
    (
        select 
            distinct templates.id 
        from
            templates
        left join
            templates_tags
        on 
            templates_tags.template_id=templates.id
        left join
            tags
        on 
            templates_tags.tag_id=tags.id
        left join
            questions
        on 
            questions.template_id=templates.id
        where
            templates.title like '%${searchText.toLowerCase()}%' or
            templates.description like '%${searchText.toLowerCase()}%' or
            templates.topic like '%${searchText.toLowerCase()}%' or
            tags.tag like '%${searchText.toLowerCase()}%' or
            questions.title like '%${searchText.toLowerCase()}%' or
            questions.description like '%${searchText.toLowerCase()}%'
    )
    order by modifiedat desc
  `);
  return NextResponse.json({ rows });
}
