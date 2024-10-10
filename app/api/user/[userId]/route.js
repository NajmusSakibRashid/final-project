import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request, { params }) {
  try {
    const { rows } = await sql`SELECT * FROM users1 WHERE id=${params.userId}`;
    // console.log(rows);
    return NextResponse.json(rows[0]);
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      { message: "Error getting user" },
      { status: 500 }
    );
  }
}
