import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { userId, templateId } = await request.json();
  try {
    const cookieStore = cookies(request.headers);
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    if (!decoded || decoded.id != userId) {
      return NextResponse.json({ message: "Invalid user" }, { status: 401 });
    }
    const { rows } = await sql.query(
      `select id from template_permission where user_id=${userId} and template_id=${parseInt(
        templateId
      )}`
    );
    const {
      rows: [{ is_public }],
    } = await sql`select is_public from templates where id=${parseInt(
      templateId
    )}`;
    // console.log(rows, is_public);
    if (rows.length === 0 && is_public === false) {
      return NextResponse.json({ message: "Invalid user" }, { status: 401 });
    }
    const {
      rows: [{ id }],
    } = await sql.query(
      "insert into forms (owner,template_id,date) values ($1,$2,now()) returning id",
      [userId, parseInt(templateId)]
    );
    await sql.query(`
      insert into answers (form_id,text,question_id,index) select ${id},'',questions.id,questions.index 
      from templates,questions
      where templates.id=${parseInt(
        templateId
      )} and questions.template_id=templates.id
      and questions.type='text'
    `);
    await sql.query(`
      insert into answers (form_id,number,question_id,index) select ${id},0,questions.id,questions.index 
      from templates,questions
      where templates.id=${parseInt(
        templateId
      )} and questions.template_id=templates.id
      and questions.type='number'
    `);
    await sql.query(`
      insert into answers (form_id,textarea,question_id,index) select ${id},'',questions.id,questions.index 
      from templates,questions
      where templates.id=${parseInt(
        templateId
      )} and questions.template_id=templates.id
      and questions.type='textarea'
    `);
    await sql.query(`
      insert into answers (form_id,checkbox,question_id,index) select ${id},true,questions.id,questions.index 
      from templates,questions
      where templates.id=${parseInt(
        templateId
      )} and questions.template_id=templates.id
      and questions.type='checkbox'
    `);
    return NextResponse.json({ id });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
