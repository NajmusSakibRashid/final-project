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
    if (!decoded || decoded.id != owner) {
      return NextResponse.json({ message: "Invalid user" }, { status: 401 });
    }
    switch (type) {
      case "text":
        await sql.query(
          "update answers set text=$1 where form_id=$2 and question_id=$3",
          [answers, parseInt(formId), parseInt(questionId)]
        );
        break;
      case "number":
        await sql.query(
          "update answers set number=$1 where form_id=$2 and question_id=$3",
          [answers, parseInt(formId), parseInt(questionId)]
        );
        break;
      case "textarea":
        await sql.query(
          "update answers set textarea=$1 where form_id=$2 and question_id=$3",
          [answers, parseInt(formId), parseInt(questionId)]
        );
        break;
      case "checkbox":
        await sql.query(
          "update answers set checkbox=$1 where form_id=$2 and question_id=$3",
          [answers, parseInt(formId), parseInt(questionId)]
        );
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
