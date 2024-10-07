import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
  try {
    const cookieStore = cookies(request.headers);
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
    const { id } = decoded;
    const { rows } =
      await sql`SELECT is_public,owner FROM templates WHERE id=${params.templateId}`;
    const { rows: authenticUsers } =
      await sql`select users1.id,users1.username from template_permission,users1 where template_permission.template_id=${params.templateId} and users1.id=template_permission.user_id`;
    if (id != rows[0].owner) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }
    return NextResponse.json({
      privacy: rows[0].is_public,
      users: authenticUsers,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error getting template" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const cookieStore = cookies(request.headers);
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
    const { id } = decoded;
    const { privacy } = data;
    const { rows } =
      await sql`SELECT owner FROM templates WHERE id=${params.templateId}`;
    if (id != rows[0].owner) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }
    if (typeof privacy == "boolean")
      await sql`UPDATE templates SET is_public=${privacy} WHERE id=${params.templateId}`;
    return NextResponse.json({ message: "Privacy updated" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error updating template" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const cookieStore = cookies(request.headers);
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
    const { id } = decoded;
    const { rows } =
      await sql`SELECT owner FROM templates WHERE id=${params.templateId}`;
    if (id != rows[0].owner) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }
    await sql`DELETE FROM template_permission WHERE template_id=${params.templateId}`;
    return NextResponse.json({ message: "Access settings reset" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error resetting access settings" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const data = await request.json();
    const cookieStore = cookies(request.headers);
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
    const { id } = decoded;
    const { rows } =
      await sql`SELECT owner FROM templates WHERE id=${params.templateId}`;
    if (id != rows[0].owner) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }
    const bulk_string = data.users
      .map((user) => `(${params.templateId},${user.id})`)
      .join(",");
    const query = `insert into template_permission (template_id,user_id) values ${bulk_string} on conflict (template_id,user_id) do nothing`;
    await sql.query(query);
    return NextResponse.json({ message: "User added" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error adding user" }, { status: 500 });
  }
}
