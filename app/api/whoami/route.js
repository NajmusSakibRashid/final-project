import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = cookies(request.headers);
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token);
    return NextResponse.json(decoded);
  } catch (err) {
    return NextResponse.json(
      { message: "Error getting user" },
      { status: 500 }
    );
  }
}
