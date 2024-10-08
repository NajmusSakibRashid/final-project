"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { cookies } from "next/headers";

export function Room({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: number;
}) {
  return (
    <LiveblocksProvider
      // publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY}
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        console.log(userIds);
        const userData = [];
        for (const userId of userIds) {
          try {
            const response = await fetch(`/api/user/${userId}`);
            const user = await response.json();
            userData.push({
              name: user.username,
              avatar: `https://liveblocks.io/avatars/avatar-${user.id}.png`,
            });
          } catch (error) {
            userData.push({
              name: "Unknown",
              avatar: `https://liveblocks.io/avatars/avatar-0.png`,
            });
          }
        }
        return userData;
      }}
    >
      <RoomProvider id={`${roomId}`}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
