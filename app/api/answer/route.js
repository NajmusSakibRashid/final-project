import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";

export async function PUT(request) {
  const { questionId, formId, type, answers } = await request.json();
  try {
    const cookieStore = cookies(request.headers);
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const {
      rows: [{ owner }],
    } = await sql.query("select owner from forms where id=$1", [
      parseInt(formId),
    ]);
    if ((!decoded || decoded.id != owner) && !decoded.admin) {
      return NextResponse.json({ message: "Invalid user" }, { status: 401 });
    }
    switch (type) {
      case "text":
        const { rows: text_rows } = await sql.query(
          `update answers set text='${answers}' where form_id=${formId} and question_id=${questionId} returning id`
        );
        // console.log(text_rows);
        if (text_rows.length === 0) {
          await sql.query(
            `insert into answers (form_id, question_id, text) values (${formId}, ${questionId}, '${answers}')`
          );
        }
        break;
      case "number":
        const { rows: number_rows } = await sql.query(
          `update answers set number=${answers} where form_id=${formId} and question_id=${questionId} returning id`
        );
        // console.log(number_rows);
        if (number_rows.length === 0) {
          await sql.query(
            `insert into answers (form_id, question_id, number) values (${formId}, ${questionId}, ${answers})`
          );
        }
        break;
      case "textarea":
        const { rows: textarea_rows } = await sql.query(
          `update answers set textarea='${answers}' where form_id=${formId} and question_id=${questionId} returning id`
        );
        // console.log(textarea_rows);
        if (textarea_rows.length === 0) {
          await sql.query(
            `insert into answers (form_id, question_id, textarea) values (${formId}, ${questionId}, '${answers}')`
          );
        }
        break;
      case "checkbox":
        const { rows: checkbox_rows } = await sql.query(
          `update answers set checkbox=${answers} where form_id=${formId} and question_id=${questionId} returning id`
        );
        // console.log(checkbox_rows);
        if (checkbox_rows.length === 0) {
          await sql.query(
            `insert into answers (form_id, question_id, checkbox) values (${formId}, ${questionId}, ${answers})`
          );
        }
        break;
    }
    return NextResponse.json({ message: "Answer updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Answer update failed" },
      { status: 401 }
    );
  }
}
