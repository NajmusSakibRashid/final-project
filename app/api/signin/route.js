import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, password } = data;
    // console.log(email, password);
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }
    const hash = crypto
      .createHmac("sha256", process.env.HMAC_SECRET)
      .update(password)
      .digest("hex");
    const { rows } =
      await sql`SELECT * FROM users1 WHERE email=${email} AND password=${hash} and block is null`;
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    const key = process.env.HMAC_SECRET;
    const token = jwt.sign(
      {
        email,
        id: rows[0].id,
        username: rows[0].username,
        admin: rows[0].admin,
      },
      key
    );
    let response = NextResponse.json({
      message: "Signed in successfully",
      userId: rows[0].id,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error signing in" }, { status: 500 });
  }
}
