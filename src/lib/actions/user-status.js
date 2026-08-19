"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUsersActiveStatus(userIds) {
  if (!userIds || userIds.length === 0) return {};

  const statusMap = {};
  const reqHeaders = await headers();

  // Convert Next.js ReadonlyHeaders into standard Headers object
  const headerObj = new Headers();
  reqHeaders.forEach((value, key) => {
    headerObj.append(key, value);
  });

  const now = new Date();

  await Promise.all(
    userIds.map(async (userId) => {
      try {
        const res = await auth.api.listUserSessions({
          body: { userId },
          headers: headerObj,
        });

        // Better Auth returns an array or an object with { sessions }
        const sessionsList = Array.isArray(res) ? res : res?.sessions || [];

        // Check if any session token is still valid
        const hasActiveSession = sessionsList.some(
          (s) => new Date(s.expiresAt) > now,
        );

        statusMap[userId] = hasActiveSession;
      } catch (err) {
        console.error(`Error fetching session for user ${userId}:`, err);
        statusMap[userId] = false;
      }
    }),
  );

  return statusMap;
}
