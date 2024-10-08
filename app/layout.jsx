import localFont from "next/font/local";
import "./globals.css";
import "@liveblocks/react-ui/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeNavbar from "./components/UserHomeNavbar";
import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? jwt.decode(token, process.env.HMAC_SECRET) : null;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-300 mb-[200px]`}
      >
        <div className="flex justify-between bg-base-100 p-8">
          <Link href="/lobby">
            <button className="btn">Lobby</button>
          </Link>
          {token ? (
            <div className="flex gap-4">
              <Link href={`/${decoded.id}/home-page/templates`}>
                <button className="btn">Home</button>
              </Link>
              <Link href="/">
                <button className="btn">Logout</button>
              </Link>
            </div>
          ) : (
            <Link href="/">
              <button className="btn">Login</button>
            </Link>
          )}
        </div>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
