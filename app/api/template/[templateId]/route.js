import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request, { params: { templateId } }) {
  try {
    const {
      rows: [row],
    } = await sql.query(
      `SELECT id,owner,title,createdat,modifiedat,description,topic,image FROM templates WHERE id=${templateId}`
    );
    let g_tags = [];
    try {
      const {
        rows: [{ tags }],
      } = await sql.query(
        `select array_agg(tags.tag) as tags from templates,tags,templates_tags where templates.id=templates_tags.template_id and tags.id=templates_tags.tag_id and templates.id=${templateId} group by templates.id`
      );
      g_tags = tags;
    } catch (err) {
      console.log(err.message);
    }

    // console.log(g_tags, templateId);
    const cookieStore = cookies(request.headers);
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
    if (row.owner != decoded.id) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }
    return NextResponse.json({ ...row, tags: g_tags });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error getting template" },
      { status: 500 }
    );
  }
}
