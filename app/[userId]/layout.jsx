import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const Layout = ({ children, params: { userId } }) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const decoded = jwt.decode(token, process.env.HMAC_SECRET);
  } catch (err) {
    console.log(err);
    redirect("/");
  }

  return <div>{children}</div>;
};

export default Layout;
