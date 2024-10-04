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
    await sql`INSERT INTO templates (owner,title,createdat,modifiedat,description,topic,tags) VALUES (${userId},'',now(),now(),'','','')`;
    const { rows } =
      await sql`select max(id) as max_id from templates where owner=${userId}`;
    console.log(rows);
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
    const { userId, templateId } = data;
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
    if (userId != decoded.id) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }
    await sql`UPDATE templates SET title=${data.title},description=${
      data.description
    },topic=${data.topic},tags=${data.tags.join(",")},modifiedat=now(),image=${
      data.image
    } WHERE id=${templateId}`;
    return NextResponse.json({ message: "Template updated" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error updating template" },
      { status: 500 }
    );
  }
}
