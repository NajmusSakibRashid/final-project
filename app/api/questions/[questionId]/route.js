import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request, { params: { questionId: templateId } }) {
  try {
    const cookieStore = cookies(request.headers.get("Cookie"));
    const token = cookieStore.get("token").value;
    const { id, admin } = jwt.decode(token, process.env.JWT_SECRET);
    const {
      rows: [{ owner }],
    } = await sql`select owner from templates where id=${templateId}`;
    if (id !== owner && !admin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: 401 }
      );
    }
    const { rows } =
      await sql`select * from questions where template_id=${templateId} order by index`;
    return NextResponse.json({ rows });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const cookieStore = cookies(request.headers.get("Cookie"));
    const token = cookieStore.get("token").value;
    const { id, admin } = jwt.decode(token, process.env.JWT_SECRET);
    const {
      rows: [{ owner }],
    } =
      await sql`select templates.owner as owner from templates,questions where templates.id=questions.template_id and questions.id=${params.questionId}`;
    if (id !== owner && !admin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: 401 }
      );
    }
    await sql`delete from questions where id=${params.questionId}`;
    return NextResponse.json({ message: "Questions deleted" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const cookieStore = cookies(request.headers.get("Cookie"));
    const token = cookieStore.get("token").value;
    const { id, admin } = jwt.decode(token, process.env.JWT_SECRET);
    const { rows } =
      await sql`select templates.owner as owner from templates,questions where templates.id=questions.template_id and questions.id=${params.questionId}`;
    if (id !== rows[0].owner && !admin)
      return NextResponse.json(
        {
          message: "You are not authorized to perform this action",
        },
        { status: 401 }
      );
    await sql`update questions set index=${data.index} where id=${params.questionId}`;
    return NextResponse.json({ message: "Index updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
