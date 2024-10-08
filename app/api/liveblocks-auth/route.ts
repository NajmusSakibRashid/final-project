import { Liveblocks } from "@liveblocks/node";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_API_KEY,
});

export async function POST(request: Request) {
  // Get the current user from your database
  // const user = __getUserFromDB__(request);

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);

    // console.log(decoded);

    const user = {
      id: `${decoded.id}`,
      metadata: {
        name: decoded.username,
        avatar: `https://liveblocks.io/avatars/avatar-${decoded.id}.png`,
      },
      organization: "1",
      group: "1",
    };
    const session = liveblocks.prepareSession(
      user.id,
      { userInfo: user.metadata } // Optional
    );

    // Use a naming pattern to allow access to rooms with wildcards
    // Giving the user read access on their org, and write access on their group
    session.allow(`*`, session.READ_ACCESS);
    session.allow(`*`, session.FULL_ACCESS);

    // Authorize the user and return the result
    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (err) {
    // console.log(err);
    const session = liveblocks.prepareSession("anonymous");
    session.allow(`*`, session.READ_ACCESS);
    const { status, body } = await session.authorize();
    return new Response(body, { status });
  }

  // Start an auth session inside your endpoint
}
