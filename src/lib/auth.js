import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.CONNECTION_STRING);
const db = client.db("Start_Hub_X");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      plan: { default: "free" },
    },
  },
  plugins: [
    admin({
      defaultRole: "collaborator",

      roles: {
        founder: "founder",
        collaborator: "collaborator",
      },

      allowUserToSetRole: true,
    }),
  ],
});
