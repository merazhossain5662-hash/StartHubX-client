"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUsersActiveStatus(userIds) {
  if (!userIds || userIds.length === 0) return {};

  const reqHeaders = await headers();
  const statusMap = {};

  await Promise.all(
    userIds.map(async (userId) => {
      try {
        // Pass query object instead of body
        const sessions = await auth.api.listUserSessions({
          query: { userId },
          headers: reqHeaders,
        });

        const now = new Date();

        // Ensure sessions is an array and check active expiration dates
        const hasActiveSession =
          Array.isArray(sessions) &&
          sessions.some((s) => new Date(s.expiresAt) > now);

        statusMap[userId] = hasActiveSession;
      } catch (err) {
        console.error(`Failed to fetch session for ${userId}:`, err);
        statusMap[userId] = false;
      }
    }),
  );

  return statusMap;
}
