import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const data = await request.json();
    const cookieStore = cookies(request.headers.get("Cookie"));
    const token = cookieStore.get("token").value;
    const { id } = jwt.decode(token, process.env.JWT_SECRET);
    const { rows } =
      await sql`select owner from templates where id=${data.template_id}`;
    if (id !== rows[0].owner)
      return NextResponse.json(
        {
          message: "You are not authorized to perform this action",
        },
        { status: 401 }
      );
    const {
      rows: [{ max }],
    } =
      await sql`select max(index) max from questions where template_id=${data.template_id}`;
    // console.log(max);
    // console.log(
    //   `insert into questions (title,description,type,edit,template_id,index) values ('${
    //     data.title
    //   }','${data.description}','${data.type}','${data.edit}',${
    //     data.template_id
    //   },${max ? max + 1 : 1} returning id`
    // );
    const {
      rows: [{ id: question_id }],
    } = await sql.query(
      `insert into questions (title,description,type,edit,template_id,index) values ('${
        data.title
      }','${data.description}','${data.type}','${data.edit}',${
        data.template_id
      },${max ? max + 1 : 0}) returning id`
    );
    return NextResponse.json({ question_id });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const cookieStore = cookies(request.headers.get("Cookie"));
    const token = cookieStore.get("token").value;
    const { id } = jwt.decode(token, process.env.JWT_SECRET);
    const { rows } =
      await sql`select owner from templates where id=${data.template_id}`;
    if (id !== rows[0].owner)
      return NextResponse.json(
        {
          message: "You are not authorized to perform this action",
        },
        { status: 401 }
      );
    await sql`update questions set title=${data.title},description=${data.description},type=${data.type},edit=${data.edit} where id=${data.id}`;
    return NextResponse.json({ message: "Question updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
