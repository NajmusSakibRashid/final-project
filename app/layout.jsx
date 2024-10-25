import localFont from "next/font/local";
import "./globals.css";
import "@liveblocks/react-ui/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeNavbar from "./components/UserHomeNavbar";
import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Search from "./components/Search";
import ThemeController from "./components/ThemeController";

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
  title: "NS Forms",
  description: "Created for iTransition Final Project",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? jwt.decode(token, process.env.HMAC_SECRET) : null;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 mb-[200px]`}
      >
        <ThemeController />
        <div className="flex justify-between bg-base-100 p-8 flex-wrap gap-2">
          <div className="flex gap-4">
            <Link href="/lobby">
              <button className="btn">Lobby</button>
            </Link>
            {decoded?.admin && (
              <Link href={`/${decoded.id}/admin-panel`}>
                <button className="btn">Admin Panel</button>
              </Link>
            )}
          </div>

          <Search />

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
