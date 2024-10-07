import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const data = await request.json();
    const { userId } = data;
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
    if (userId != decoded.id) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }
    await sql`INSERT INTO templates (owner,title,createdat,modifiedat,description,topic,is_public) VALUES (${userId},'',now(),now(),'','',true)`;
    const { rows } =
      await sql`select max(id) as max_id from templates where owner=${userId}`;
    // console.log(rows);
    return NextResponse.json({
      message: "Template created",
      templateId: rows[0].max_id,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error creating template" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { tags, userId, templateId } = data;
    const cookieStore = cookies();
    try {
      const token = cookieStore.get("token").value;
      const decoded = jwt.decode(token, process.env.HMAC_SECRET);
      if (userId != decoded.id) {
        throw new Error("Invalid user");
      }
    } catch (err) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }
    // console.log(data);
    await sql`UPDATE templates SET title=${data.title},description=${data.description},topic=${data.topic},modifiedat=now(),image=${data.image} WHERE id=${templateId}`;
    await sql`DELETE FROM templates_tags WHERE template_id=${templateId}`;
    const bulk_tag = tags.map((tag) => `('${tag}')`).join(",");
    await sql.query(
      `insert into tags (tag) values ${bulk_tag} on conflict (tag) do nothing`
    );
    const bulk_tag_search = tags.map((tag) => `'${tag}'`).join(",");
    const { rows } = await sql.query(
      `select id,tag from tags where tag in (${bulk_tag_search})`
    );
    const bulk_template_tags = rows
      .map((row) => `(${templateId},${row.id})`)
      .join(",");
    await sql.query(
      `insert into templates_tags (template_id,tag_id) values ${bulk_template_tags} on conflict (template_id,tag_id) do nothing`
    );
    return NextResponse.json({ message: "Template updated" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error updating template" },
      { status: 500 }
    );
  }
}
