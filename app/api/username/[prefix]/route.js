import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request, { params }) {
  try {
    const { rows } = await sql.query(
      `select id,username from users1 where username like '${params.prefix}%'`
    );
    return NextResponse.json({ rows });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error getting tags" },
      { status: 500 }
    );
  }
}
