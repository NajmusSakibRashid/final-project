import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request, { params: { templateId } }) {
  try {
    const { rows } = await sql`SELECT * FROM templates WHERE id=${templateId}`;
    // console.log(rows, templateId);
    const cookieStore = cookies(request.headers);
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
    if (rows[0].owner != decoded.id) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error getting template" },
      { status: 500 }
    );
  }
}
