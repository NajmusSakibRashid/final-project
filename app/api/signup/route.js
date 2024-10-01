import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import crypto from "crypto";

export async function POST(request) {
  try {
    const data = await request.json();
    const { username, email, password } = data;
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }
    const hash = crypto
      .createHmac("sha256", process.env.HMAC_SECRET)
      .update(password)
      .digest("hex");
    await sql`INSERT INTO users1 (username, email, password) VALUES (${username}, ${email}, ${hash})`;
    return NextResponse.json({ message: "Signed up successfully" });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({ message: "Error signing up" }, { status: 500 });
  }
}
