"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import axios from "axios";

export function CollaborativeApp() {
  const { threads } = useThreads();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/whoami");
        setToken(data);
      } catch (error) {
        setToken(null);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-lg relative">
      {!token && (
        <div className="absolute inset-0 z-10 flex justify-center items-center bg-black opacity-30 text-white">
          <h1 className="text-5xl font-bold">Read Only</h1>
        </div>
      )}
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer />
    </div>
  );
}
