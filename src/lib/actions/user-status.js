"use server";
import { auth } from "@/lib/actions/auth";
import { headers } from "next/headers";

/**
 * Checks active session statuses for a batch of user IDs.
 * Returns an object mapping userId to boolean (true = active session exists).
 */
export async function getUsersActiveStatus(userIds) {
  if (!userIds || userIds.length === 0) return {};

  const reqHeaders = await headers();
  const statusMap = {};

  // Check sessions for each user concurrently
  await Promise.all(
    userIds.map(async (userId) => {
      try {
        const sessions = await auth.api.listUserSessions({
          body: { userId },
          headers: reqHeaders,
        });

        const now = new Date();
        // User is active if at least one session token has not expired
        const hasActiveSession =
          Array.isArray(sessions) &&
          sessions.some((s) => new Date(s.expiresAt) > now);

        statusMap[userId] = hasActiveSession;
      } catch (err) {
        statusMap[userId] = false;
      }
    }),
  );

  return statusMap;
}
