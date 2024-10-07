import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request, { params }) {
  try {
    const { rows } = await sql.query(
      `select tag from tags where tag like '${params.prefix}%'`
    );
    return NextResponse.json({ tags: rows.map((row) => row.tag) });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error getting tags" },
      { status: 500 }
    );
  }
}
